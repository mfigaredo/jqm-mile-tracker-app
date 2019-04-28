$(document).one('pageinit', function(){

    showRuns()

    // Add Handler
    $('#submitAdd').on('tap', addRun)

    // Edit Hander
    $('#submitEdit').on('tap', editRun)

    // Clear Runs Handler
    $('#clearRuns').on('tap', clearRuns)

    // Pre-edit Handler
    $('#stats').on('tap', 'a.editLink', function(e){
        // e.preventDefault()
        var runId = $(this).attr('data-id');
        // console.log(runId);
        var run = getRunById(runId)
        $('#editMiles').val( run.miles )
        $('#editDate').val( run.date )
        $('#editId').val( runId )
    })

    $('#stats').on('tap', 'a.deleteLink', function(e){
        e.preventDefault()
        if( confirm('Are you sure?')) {
            var runId = $(this).attr('data-id');
            // console.log(runId);
            var runs = getRunsObject()
            for(var i=0; i<runs.length; i++) {
                if( runs[i].id == runId ) {
                    runs.splice(i,1)
                }
            }
            alert('Run deleted')
            // set Stringified object to localStorage
            localStorage.setItem('runs', JSON.stringify(runs))

            // Redirect
            window.location.href = 'index.html' 
        }   
    });

    // show all runs on main page
    function showRuns() {
        var runs = getRunsObject()

        // check if empty
        if(runs != '' && runs != null) {
            for(var i=0; i<runs.length; i++) {
                $('#stats').append('<li class="ui-body-inherit ui-li-static"><strong>Date: </strong> '+runs[i]['date']+'<br><strong>Distance:</strong> '+runs[i]['miles']+'miles <div class="controls"><a href="#edit" data-transition="slide" class="ui-btn ui-btn-inline ui-btn-icon-notext ui-corner-all ui-icon-edit editLink" data-id="'+runs[i]['id']+'">Edit</a> <a href="#" class="ui-btn ui-btn-inline ui-btn-icon-notext ui-corner-all ui-icon-delete deleteLink" data-id="'+runs[i]['id']+'">Delete</a></div></li>')
            }
            // $('#home').bind('pageinit', function(){
            $('#stats').listview('refresh')
            // })
            $('#clearRuns').show()
        } else {
            $('#stats').html('<p>You have no logged runs</p>')
            $('#clearRuns').hide()
        }
    }

    function addRun(){
        // Get form values
        var miles = $('#addMiles').val()
        var date = $('#addDate').val()

        // Create "Run" object
        var run = {
            id: Math.floor(Math.random() * 1000000),
            date: date,
            miles: parseFloat(miles),
        }

        var runs = getRunsObject()

        // Add run to runs array
        runs.push(run)

        alert('Run added')
        // set Stringified object to localStorage
        localStorage.setItem('runs', JSON.stringify(runs))

        // Redirect
        window.location.href = 'index.html'
    }

    function editRun() {
        var runId = $('#editId').val()

        var miles = $('#editMiles').val()
        var date = $('#editDate').val()

        var runs = getRunsObject()

        for(var i=0; i<runs.length; i++) {
            if(runs[i].id == runId) {
                runs[i].miles = miles
                runs[i].date = date
            }
        }
        alert('Run Updated')
        // set Stringified object to localStorage
        localStorage.setItem('runs', JSON.stringify(runs))

        // Redirect
        window.location.href = 'index.html'        
    }

    function clearRuns() {
        if(confirm('Are you sure?')) {
            localStorage.removeItem('runs')
            showRuns()
            //$('#stats').html('').listview('refresh')
        }
    }

    function getRunById(id) {
        return getRunsObject().find(function(run) {
            return run.id == id
        })
    }

    // console.log(getRunsObject())
    // console.log(getRunById(807152))

    function getRunsObject(){
        // Set runs array
        var runs = new Array()
        // Get current runs from localstorage
        var currentRuns = localStorage.getItem('runs')

        // Check localStorage
        if(currentRuns != null && currentRuns != '') {
            // Set to runs
            runs = JSON.parse(currentRuns)
        } else {
            runs = []
        }

        // Return runs object
        return runs.sort(function(a,b){
            return new Date(b.date) - new Date(a.date)
        })
    }

    //alert($('#footer').html())
    // $('div[data-role=page]').on('pagecontainerload', function(){
    //     console.log('loading ' + $(this).attr('id'))
    //     $(this).find('[data-role=footer]').html( $('#footer').html() ).css({'padding':'0 auto'});
    // })   
    $('[data-role=header]').html( $('#header').html() );
    $('[data-role=footer]').html( $('#footer').html() ).css({'padding':'0 auto'});
})


