import { useState, useEffect } from 'react';
import { useApi } from "../../../../hooks";
import { ClipLoader } from 'react-spinners'; 
import UploadNewResumeButton from '../UploadNewResumeButton';
import { parseISO, format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
} from '@mui/material';

const SavedResumesSection = ({ showResume }) => {
  const api = useApi();
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Sorting state
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('updateDate');

  const loadPage = () => {
    api.get(`/resume/all`)
      .then(response => response.json())
      .then(data => {
        setResumes(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch data:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {   
    loadPage();
  }, []);

  const filteredResumes = resumes.filter(resume => resume.originalResumeID === null);

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

  const formatDate = (dateStr) => {
    const date = parseISO(dateStr);
    return format(date, 'MM/dd/yyyy');
  };

  // Sorting logic
  const sortedResumes = filteredResumes.slice().sort((a, b) => {
    let aValue, bValue;
    if (orderBy === 'resumeId') {
      aValue = a.resumeId;
      bValue = b.resumeId;
    } else if (orderBy === 'insertDate') {
      aValue = a.insertDate;
      bValue = b.insertDate;
    } else if (orderBy === 'updateDate') {
      aValue = a.updateDate;
      bValue = b.updateDate;
    }
    if (aValue < bValue) return order === 'asc' ? -1 : 1;
    if (aValue > bValue) return order === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="resume-page-centered-column-container">
      {isLoading ? (
        <ClipLoader />
      ) : (
        <>
          <Table className="resume-page-full-width-table">
            <TableHead>
              <TableRow className="resume-page-table-header-row">
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'resumeId'}
                    direction={orderBy === 'resumeId' ? order : 'asc'}
                    onClick={() => handleSortRequest('resumeId')}
                  >
                    Resume Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'insertDate'}
                    direction={orderBy === 'insertDate' ? order : 'asc'}
                    onClick={() => handleSortRequest('insertDate')}
                  >
                    Created
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'updateDate'}
                    direction={orderBy === 'updateDate' ? order : 'asc'}
                    onClick={() => handleSortRequest('updateDate')}
                  >
                    Last Modified
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedResumes
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((resume) => (
                  <TableRow 
                    key={resume.resumeId}
                  >
                    <TableCell
                      onClick={() => showResume(resume.resumeId)}
                      className="resume-page-resume-name"
                      style={{ cursor: 'pointer', color: '#1976d2' }}
                    >
                      {`resume${resume.resumeId}`}
                    </TableCell>
                    <TableCell>{formatDate(resume.insertDate)}</TableCell>
                    <TableCell>{formatDate(resume.updateDate)}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredResumes.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <UploadNewResumeButton loadPage={loadPage} />
        </>
      )}
    </div>
  );
};

export default SavedResumesSection;