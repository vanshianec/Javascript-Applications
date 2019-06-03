const eventService = (() => {

    function getEvents() {
        return kinvey.get('appdata', `events?query={}&sort={"interestCount": -1}`, 'kinvey');
    }

    function createEvent(event) {
        return kinvey.post('appdata', 'events', 'kinvey', event);
    }

    function getEvent(id) {
        return kinvey.get('appdata', `events/${id}`, 'kinvey');
    }

    function updateEvent(id, event) {
        return kinvey.update('appdata', `events/${id}`, 'kinvey', event);
    }

    function removeEvent(id) {
        return kinvey.remove('appdata', `events/${id}`, 'kinvey');
    }

    function getMyEvents(){
        return kinvey.get('appdata', `events?query={"_acl.creator":"${sessionStorage.getItem('id')}"}`, 'kinvey')
    }

    return {
        getEvents,
        createEvent,
        getEvent,
        updateEvent,
        removeEvent,
        getMyEvents
    }

})();