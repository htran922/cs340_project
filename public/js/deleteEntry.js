function deleteArtifact(id){
  $.ajax({
    url:'/artifact/' + id,
    type: 'DELETE',
    success: function(results){
      window.location.reload(true);
    }
  });
}

function deleteStaff(id){
  $.ajax({
    url:'/staff/' + id,
    type: 'DELETE',
    success: function(results){
      window.location.reload(true);
    }
  });
}

function deleteEvent(id){
  $.ajax({
    url:'/event/' + id,
    type: 'DELETE',
    success: function(results){
      window.location.reload(true);
    }
  });
}

function deleteExhibition(id){
  $.ajax({
    url:'/exhibition/' + id,
    type: 'DELETE',
    success: function(results){
      window.location.reload(true);
    }
  });
}
