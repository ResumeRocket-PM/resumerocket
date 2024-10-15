import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  IconButton,
  MenuItem,
  Checkbox,
  ListItemText,
  Menu,
  TablePagination,
  Select,
  FormControl
} from '@mui/material';
import { Link } from 'react-router-dom';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useApi } from "../../../hooks.js";
import SubmitJobPosting from './SubmitJobPosting.jsx';

const ResumeListPage = () => {
  const [filter, setFilter] = useState({ company: [], position: [], status: [] });
  const [anchorElCompany, setAnchorElCompany] = useState(null);
  const [anchorElPosition, setAnchorElPosition] = useState(null);
  const [anchorElStatus, setAnchorElStatus] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('applyDate');
  const [data, setData] = useState([]);
  const [options, setOptions] = useState({ company: [], position: [], status: [] });

  const api = useApi();

  const getJobPostings = () => {
    api.get('/job/postings').then(response => {
      if (response.ok) {
        response.json().then(data => {
          const jobPostings = data.result;
          setData(jobPostings);

          // Generate distinct and sorted options
          const companies = [...new Set(jobPostings.map(item => item.companyName))].sort();
          const positions = [...new Set(jobPostings.map(item => item.position))].sort();
          const statuses = [...new Set(jobPostings.map(item => item.status))].sort();

          setOptions({ company: companies, position: positions, status: statuses });
        });
      } else {
        console.log("Failed to load job postings");
      }
    });
  };

  const refreshJobPostings = () => {
    getJobPostings();
  };

  useEffect(() => {
    getJobPostings();
  }, []);

  const handleCompanyFilterClick = (event) => {
    setAnchorElCompany(event.currentTarget);
  };

  const handlePositionFilterClick = (event) => {
    setAnchorElPosition(event.currentTarget);
  };

  const handleStatusFilterClick = (event) => {
    setAnchorElStatus(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorElCompany(null);
    setAnchorElPosition(null);
    setAnchorElStatus(null);
  };

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    setFilter((prev) => ({
      ...prev,
      [event.target.name]: prev[event.target.name].includes(value)
        ? prev[event.target.name].filter(item => item !== value)
        : [...prev[event.target.name], value],
    }));
  };

  const handleStatusChange = (id, newStatus) => {
    const url = `/job/postings/${id}?status=${newStatus}`;
  
    api.put(url) 
      .then((response) => {
        console.log('Status updated successfully:', response.data);
  
        setData((prevData) =>
          prevData.map((item) => (item.resumeID === id ? { ...item, status: newStatus } : item))
        );

        refreshJobPostings();
      })
      .catch((error) => {
        console.error('Error updating status:', error);
      });
  };

  const filteredData = data.filter(item => {
    const companyMatch = filter.company.length ? filter.company.includes(item.companyName) : true;
    const positionMatch = filter.position.length ? filter.position.includes(item.position) : true;
    const statusMatch = filter.status.length ? filter.status.includes(item.status) : true;
    return companyMatch && positionMatch && statusMatch;
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSortRequest = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedData = filteredData.sort((a, b) => {
    if (a[orderBy] < b[orderBy]) {
      return order === 'asc' ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return order === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Hardcoded status options
  const statusOptions = ['Pending', 'Interview Scheduled', 'Rejected', 'Accepted'];

  return (
    <div style={{ width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 auto' }}>
      <Table style={{ width: '100%' }}>
        <TableHead>
          <TableRow style={{ borderBottom: '2px solid #000' }}>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'applyDate'}
                direction={orderBy === 'applyDate' ? order : 'asc'}
                onClick={() => handleSortRequest('applyDate')}
              >
                Applied Date
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <TableSortLabel
                  active={orderBy === 'companyName'}
                  direction={orderBy === 'companyName' ? order : 'asc'}
                  onClick={() => handleSortRequest('companyName')}
                >
                  Company
                </TableSortLabel>
                <IconButton onClick={handleCompanyFilterClick}>
                  <FilterListIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorElCompany}
                  open={Boolean(anchorElCompany)}
                  onClose={handleMenuClose}
                >
                  {options.company.map(option => (
                    <MenuItem key={option}>
                      <Checkbox
                        checked={filter.company.includes(option)}
                        onChange={handleCheckboxChange}
                        value={option}
                        name="company"
                      />
                      <ListItemText primary={option} />
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </TableCell>
            <TableCell>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <TableSortLabel
                  active={orderBy === 'position'}
                  direction={orderBy === 'position' ? order : 'asc'}
                  onClick={() => handleSortRequest('position')}
                >
                  Position
                </TableSortLabel>
                <IconButton onClick={handlePositionFilterClick}>
                  <FilterListIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorElPosition}
                  open={Boolean(anchorElPosition)}
                  onClose={handleMenuClose}
                >
                  {options.position.map(option => (
                    <MenuItem key={option}>
                      <Checkbox
                        checked={filter.position.includes(option)}
                        onChange={handleCheckboxChange}
                        value={option}
                        name="position"
                      />
                      <ListItemText primary={option} />
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </TableCell>
            <TableCell>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                Status
                <IconButton onClick={handleStatusFilterClick}>
                  <FilterListIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorElStatus}
                  open={Boolean(anchorElStatus)}
                  onClose={handleMenuClose}
                >
                  {options.status.map(option => (
                    <MenuItem key={option}>
                      <Checkbox
                        checked={filter.status.includes(option)}
                        onChange={handleCheckboxChange}
                        value={option}
                        name="status"
                      />
                      <ListItemText primary={option} />
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </TableCell>
            <TableCell>Resume</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
            <TableRow key={row.resumeID}>
              <TableCell>{new Date(row.applyDate).toLocaleDateString()}</TableCell>
              <TableCell>{row.companyName}</TableCell>
              <TableCell>{row.position}</TableCell>
              <TableCell>
                <FormControl variant="outlined" fullWidth>
                  <Select
                    value={row.status}
                    onChange={(e) => handleStatusChange(row.resumeID, e.target.value)}
                    label="Status"
                  >
                    {statusOptions.map(option => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>

              
              <TableCell>
                <Link to={`/create-resume/${row.resumeID}`}  align='center'>
                  { 'View' }
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <SubmitJobPosting onSubmit={refreshJobPostings} />
    </div>
  );
};

export default ResumeListPage;
