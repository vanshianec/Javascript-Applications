function attachEvents() {
    const url = 'https://baas.kinvey.com/appdata/kid_BJXTsSi-e/students';
    const kinveyUsername = "guest";
    const kinveyPassword = "guest";
    const base64auth = btoa(kinveyUsername + ":" + kinveyPassword);
    const headers = {"Authorization": "Basic " + base64auth, "Content-type": "application/json"};

    loadStudents();

    function loadStudents() {
        let getRequest = {url, headers};
        $.ajax(getRequest).then(displayStudents).catch(displayError);
    }

    $('#add').click(addStudent);

    function addStudent() {
        [ID, FirstName, LastName, FacultyNumber, Grade] = $('#studentData input').map((index, item) => $(item).val());
        if (ID, FirstName, LastName, FacultyNumber, Grade) {
            $("#studentData input").val("");
            let data = JSON.stringify({
                ID: +ID,
                FirstName,
                LastName,
                FacultyNumber,
                Grade: +Grade
            });

            let request = {
                url,
                method: 'POST',
                headers,
                data
            };
            $.ajax(request).then(loadStudents).catch(displayError);
        }
    }

    function displayStudents(studentsArray) {
        studentsArray.sort((s1, s2) => +s1['ID'] - +s2['ID']).forEach(student => {
            let parent = $('<tr>');
            parent.append($('<th>').text(student['ID']))
                .append($('<th>').text(student['FirstName']))
                .append($('<th>').text(student['LastName']))
                .append($('<th>').text(student['FacultyNumber']))
                .append($('<th>').text(student['Grade']));
            $('#results').append(parent);
        });
    }

    function displayError(error) {
        alert(error);
    }
}