document.addEventListener('DOMContentLoaded', function () {
    var navbar = document.getElementById('navbar');
    var centeredMessage = document.querySelector('.centered-message');

    window.addEventListener('scroll', function () {
        var scrollPosition = window.scrollY;
        var newTopPosition = 50 - scrollPosition / 9;
        centeredMessage.style.top = newTopPosition + '%';
        var opacity = Math.min(scrollPosition / 200, 1);
        navbar.style.backgroundColor = 'rgba(24, 23, 21, ' + opacity + ')';
    });

    function typeText(element, text, index, interval, callback) {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(function () {
                typeText(element, text, index, interval, callback);
            }, interval);
        } else {
            callback();
        }
    }

    function checkServerStatus() {
        var serverAddress = "in6.gbnodes.store";
        var serverPort = "25609";
        var statusBox = document.getElementById('isOnline');
        var playerList = document.getElementById('TotalPlayerOnline');

        fetch(`https://api.mcsrvstat.us/2/${serverAddress}:${serverPort}`)
        .then(response => response.json())
        .then(data => {
            if (data.online) {
                statusBox.textContent = "Online";
            } else {
                statusBox.textContent = "Offline";
            }

            // If you have player count and names available
            if (data.players) {
                playerList.textContent = `Players: ${data.players.online}`;
                if (data.players.list) {
                    playerList.innerHTML += '<br>Players Name: ';

                    // Display a maximum of 4 player names per line
                    for (var i = 0; i < data.players.list.length; i++) {
                        if (i > 0 && i % 4 === 0) {
                            playerList.innerHTML += '<br>';
                        }
                        playerList.innerHTML += data.players.list[i] + ', ';
                    }

                    // Remove the trailing comma and space
                    playerList.innerHTML = playerList.innerHTML.slice(0, -2);
                }
            } else {
                playerList.textContent = ""; // No player information available
            }
        })
        .catch(error => {
            // Handle errors
            console.error("Error fetching server status:", error);
            statusBox.textContent = "Offline";
            playerList.textContent = ""; // Reset player list on error
        });
    }

    function showIpAddresses() {
        var javaIpAddress = "Java: in6.gbnodes.store:25609";
        var bedrockIpAddress = "Bedrock: in6.gbnodes.store port:25609";
        var bedrockport = "Port:25609";
        var ipAddressContainer = document.getElementById('ipAddressContainer');

        ipAddressContainer.innerHTML = '';
        ipAddressContainer.classList.add('ip-font');

        typeText(ipAddressContainer, javaIpAddress, 0, 50, function () {
            ipAddressContainer.innerHTML += '<br>';
            typeText(ipAddressContainer, bedrockIpAddress, 0, 50, function () {
                // After typing IP addresses, check the server status
                checkServerStatus();
            });
        });
    }

    // Call the function on page load
    checkServerStatus();

    // Set interval to refresh server status every 5 seconds
    setInterval(function () {
        checkServerStatus();
    }, 5000);

    var showIpAddressBtn = document.getElementById('showIpAddressBtn');
    showIpAddressBtn.addEventListener('click', function () {
        showIpAddresses();
    });
});
