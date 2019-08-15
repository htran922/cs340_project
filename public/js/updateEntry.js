function updateArtifact(id){
  $.ajax({
      url: '/artifact/' + id,
      type: 'PUT',
      data: $('#update-artifact').serialize(),
      success: function(result){
          window.location.replace("./");
      }
  })
};

function updateStaff(id){
  $.ajax({
      url: '/staff/' + id,
      type: 'PUT',
      data: $('#update-staff').serialize(),
      success: function(result){
          window.location.replace("./");
      }
  })
};

function updateEvent(id){
  var data = {exhibition:$('#exhibition-selector > option:selected').text(), staff:$('#staff-selector > option:selected').text(), type:$('#event-selector > option:selected').text(), date:$('#date').serialize()}
  $.ajax({
      url: '/event/' + id,
      type: 'PUT',
      data ,
      success: function(result){
          window.location.replace("./");
      }
  })
};

function updateExhibition(id){
  $.ajax({
      url: '/exhibition/' + id,
      type: 'PUT',
      data: $('#update-exhibition').serialize(),
      success: function(result){
          window.location.replace("./");
      }
  })
};

function updateStaffExhibition(id){
  var data = {staff:$('#staff_id > option:selected').text(), exhibition:$('#exhibition_id > option:selected').text()}
  $.ajax({
      url: '/staff_exhibition/' + id,
      type: 'PUT',
      data ,
      success: function(result){
          window.location.replace("./");
      }
  })
};
