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
  $.ajax({
      url: '/event/' + id,
      type: 'PUT',
      data: $('#update-event').serialize(),
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
  $.ajax({
      url: '/staff_exhibition/' + id,
      type: 'PUT',
      data: $('#update-staff-exhibition').serialize(),
      success: function(result){
          window.location.replace("./");
      }
  })
};
