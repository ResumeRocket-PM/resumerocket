import React, { useState } from 'react';
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
  FormControl,
  InputLabel,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

const ResumeListPage = () => {
  const [filter, setFilter] = useState({ company: [], position: [], status: [] });
  const [anchorElCompany, setAnchorElCompany] = useState(null);
  const [anchorElPosition, setAnchorElPosition] = useState(null);
  const [anchorElStatus, setAnchorElStatus] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('appliedDate');
  const [data, setData] = useState([
    { id: 1, appliedDate: '2024-01-01', company: 'Company A', position: 'Position A', status: 'Interview', resume: 'resume1.pdf' },
    { id: 2, appliedDate: '2024-01-02', company: 'Company B', position: 'Position B', status: 'Applied', resume: 'resume2.pdf' },
    { id: 3, appliedDate: '2024-01-03', company: 'Company C', position: 'Position C', status: 'Rejected', resume: 'resume3.pdf' },
    { id: 4, appliedDate: '2024-01-04', company: 'Company A', position: 'Position A', status: 'Interview', resume: 'resume4.pdf' },
    { id: 5, appliedDate: '2024-01-05', company: 'Company B', position: 'Position B', status: 'Applied', resume: 'resume5.pdf' },
    { id: 6, appliedDate: '2024-01-06', company: 'Company C', position: 'Position C', status: 'Rejected', resume: 'resume6.pdf' },
  ]);

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
    setData((prevData) => 
      prevData.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const options = {
    company: ['Company A', 'Company B', 'Company C'],
    position: ['Position A', 'Position B', 'Position C'],
    status: ['Interview', 'Applied', 'Rejected'],
  };

  const filteredData = data.filter(item => {
    const companyMatch = filter.company.length ? filter.company.includes(item.company) : true;
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

  return (
    <div style={{ width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 auto' }}>
      <Table style={{ width: '100%' }}>
        <TableHead>
          <TableRow style={{ borderBottom: '2px solid #000' }}>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'appliedDate'}
                direction={orderBy === 'appliedDate' ? order : 'asc'}
                onClick={() => handleSortRequest('appliedDate')}
              >
                Applied Date
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <TableSortLabel
                  active={orderBy === 'company'}
                  direction={orderBy === 'company' ? order : 'asc'}
                  onClick={() => handleSortRequest('company')}
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
            <TableRow key={row.id}>
              <TableCell>{row.appliedDate}</TableCell>
              <TableCell>{row.company}</TableCell>
              <TableCell>{row.position}</TableCell>
              <TableCell>
                <FormControl variant="outlined" fullWidth>
                  <Select
                    value={row.status}
                    onChange={(e) => handleStatusChange(row.id, e.target.value)}
                    label="Status"
                  >
                    {options.status.map(option => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>{row.resume}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};

export default ResumeListPage;
