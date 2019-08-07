function filterStaffByJob() {
    //get the id of the selected homeworld from the filter dropdown
    var job_id = document.getElementById('job_filter').value
    //construct the URL and redirect to it
    window.location = '/staff/filter/' + parseInt(job_id)
}
