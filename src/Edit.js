import React, { useState } from 'react';
const EditLeaveRequest = () => {
 const [formData, setFormData] = useState({
   startDate: '',
   endDate: '',
   leaveTypeID: '',
   dateRequested: '',
   requestComments: '',
   approved: '',
   cancelled: false,
   requestingEmployeeID: '',
   dateCreated: '',
   dateModified: '',
 });
 const [errors, setErrors] = useState({});
 const validateForm = () => {
   let newErrors = {};
   if (!formData.startDate) {
     newErrors.startDate = 'Start Date is required';
   }
   if (!formData.endDate) {
     newErrors.endDate = 'End Date is required';
   }
   if (!formData.leaveTypeID) {
     newErrors.leaveTypeID = 'Leave Type ID is required';
   }
   if (!formData.dateRequested) {
     newErrors.dateRequested = 'Date Requested is required';
   }
   if (!formData.requestComments) {
     newErrors.requestComments = 'Request Comments are required';
   }
   if (!formData.approved) {
     newErrors.approved = 'Approved status is required';
   }
   if (!formData.requestingEmployeeID) {
     newErrors.requestingEmployeeID = 'Requesting Employee ID is required';
   }
   if (!formData.dateCreated) {
     newErrors.dateCreated = 'Date Created is required';
   }
   if (!formData.dateModified) {
     newErrors.dateModified = 'Date Modified is required';
   }
   setErrors(newErrors);
   return Object.keys(newErrors).length === 0;
 };
 const handleSubmit = (e) => {
   e.preventDefault();
   const isValid = validateForm();
   if (isValid) {
     console.log('Form submitted successfully!', formData);
     // Perform form submission logic
   } else {
     console.log('Form has validation errors.', errors);
   }
 };
 return (
<div className="m-4">
<h1>Edit</h1>
<h4>LeaveRequest</h4>
<hr />
<div className="row">
<div className="col-md-12">
<form onSubmit={handleSubmit}>
           {/* Start Date */}
<div className="form-group">
<label>Start Date</label>
<input
               type="date"
               className={`form-control ${errors.startDate ? 'is-invalid' : ''}`}
               value={formData.startDate}
               onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
             />
             {errors.startDate && <div className="invalid-feedback">{errors.startDate}</div>}
</div>
           {/* End Date */}
<div className="form-group">
<label>End Date</label>
<input
               type="date"
               className={`form-control ${errors.endDate ? 'is-invalid' : ''}`}
               value={formData.endDate}
               onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
             />
             {errors.endDate && <div className="invalid-feedback">{errors.endDate}</div>}
</div>
           {/* Leave Type ID */}
<div className="form-group">
<label>Leave Type ID</label>
<input
               type="text"
               className={`form-control ${errors.leaveTypeID ? 'is-invalid' : ''}`}
               value={formData.leaveTypeID}
               onChange={(e) => setFormData({ ...formData, leaveTypeID: e.target.value })}
             />
             {errors.leaveTypeID && <div className="invalid-feedback">{errors.leaveTypeID}</div>}
</div>
<div className="form-group">
<label>Date Requested</label>
<input
               type="date"
               className={`form-control ${errors.endDate ? 'is-invalid' : ''}`}
               value={formData.endDate}
               onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
             />
             {errors.endDate && <div className="invalid-feedback">{errors.endDate}</div>}
</div>
<div className="form-group">
<label>Request Comments</label>
<input
               type="text"
               className={`form-control ${errors.leaveTypeID ? 'is-invalid' : ''}`}
               value={formData.leaveTypeID}
               onChange={(e) => setFormData({ ...formData, leaveTypeID: e.target.value })}
             />
             {errors.leaveTypeID && <div className="invalid-feedback">{errors.leaveTypeID}</div>}
</div>
<div className="form-group">
<label>Approved</label>
<input
               type="text"
               className={`form-control ${errors.leaveTypeID ? 'is-invalid' : ''}`}
               value={formData.leaveTypeID}
               onChange={(e) => setFormData({ ...formData, leaveTypeID: e.target.value })}
             />
             {errors.leaveTypeID && <div className="invalid-feedback">{errors.leaveTypeID}</div>}
</div>
<div className="form-group">
<label>Requesting Employee ID</label>
<input
               type="text"
               className={`form-control ${errors.leaveTypeID ? 'is-invalid' : ''}`}
               value={formData.leaveTypeID}
               onChange={(e) => setFormData({ ...formData, leaveTypeID: e.target.value })}
             />
             {errors.leaveTypeID && <div className="invalid-feedback">{errors.leaveTypeID}</div>}
</div>
<div className="form-group">
<label>Date Created</label>
<input
               type="date"
               className={`form-control ${errors.endDate ? 'is-invalid' : ''}`}
               value={formData.endDate}
               onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
             />
             {errors.endDate && <div className="invalid-feedback">{errors.endDate}</div>}
</div>
<div className="form-group">
<label>Date Modified</label>
<input
               type="date"
               className={`form-control ${errors.endDate ? 'is-invalid' : ''}`}
               value={formData.endDate}
               onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
             />
             {errors.endDate && <div className="invalid-feedback">{errors.endDate}</div>}
</div>
 
           {/* ...Repeat this structure for each field */}
<div className="form-group">
<input type="submit" value="Save" className="btn btn-primary" />
</div>
</form>
</div>
</div>
<div>
<a href="#">Back to List</a>
</div>
</div>
 );
};
export default EditLeaveRequest;