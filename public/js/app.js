console.log('IQSkins loaded.');

async function fetchUser() {
    const res = await fetch('/user');
    return res.json();
}

async function updateUser() {
    const data = await fetchUser();
    const loginBtn = document.getElementById('login');
    const logoutBtn = document.getElementById('logout');
    const userEl = document.getElementById('user');

    if (data.user) {
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
        userEl.textContent = `Logged in as ${data.user.displayName}`;
        loadInventory();
    } else {
        loginBtn.style.display = 'inline-block';
        logoutBtn.style.display = 'none';
        userEl.textContent = '';
        document.getElementById('inventory').style.display = 'none';
    }
}

async function loadInventory() {
    const res = await fetch('/inventory');
    if (!res.ok) return;
    const data = await res.json();
    const itemsEl = document.getElementById('items');
    itemsEl.innerHTML = '';
    if (data && data.descriptions && data.assets) {
        data.assets.forEach(asset => {
            const desc = data.descriptions.find(d => d.classid === asset.classid && d.instanceid === asset.instanceid);
            if (desc) {
                const li = document.createElement('li');
                li.textContent = desc.market_hash_name;
                itemsEl.appendChild(li);
            }
        });
        document.getElementById('inventory').style.display = 'block';
    }
}

document.getElementById('logout').addEventListener('click', async () => {
    await fetch('/logout');
    updateUser();
});

document.addEventListener('DOMContentLoaded', updateUser);
