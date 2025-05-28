// If you don't want the particles, change the following to false
const doParticles = true;




// Do not mess with the rest of this file unless you know what you're doing

const getWidth = () => { // credit to travis on stack overflow
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
};

if (doParticles) {
    if (getWidth() < 400) $.firefly({
        minPixel: 1,
        maxPixel: 2,
        total: 20
    });
    else $.firefly({
        minPixel: 1,
        maxPixel: 3,
        total: 40
    });
}

$(document).ready(function() {
    // Function to check server status
    function checkServerStatus() {
        $.ajax({
            url: 'https://api.mcsrvstat.us/2/in6.gbnodes.store:25609', // Replace with your Minecraft server IP or domain
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                if (data.online) {
                    $('#server-status').text('Server is Online').addClass('online').removeClass('offline');
                } else {
                    $('#server-status').text('Server is Offline').addClass('offline').removeClass('online');
                }
            },
            error: function() {
                $('#server-status').text('Error checking server status').addClass('offline').removeClass('online');
            }
        });
    }

    // Initial check on page load
    checkServerStatus();

    // Check server status every 5 minutes (adjust as needed)
    setInterval(checkServerStatus, 1000); // 5 minutes in milliseconds
});
