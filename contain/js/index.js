var googleDomains = ["https://google.com", "https://drive.google.com", "https://photos.google.com", "https://maps.google.com",
  "https://analytics.google.com", "https://gmail.com", "https://youtube.com", "https://mail.google.com", "https://play.google.com/",
  "https://docs.google.com", "https://calendar.google.com", "https://hangouts.google.com"
];

function onCreated(context) {
  console.log(`Name: ${context.name}`);
  console.log(`New identity's ID: ${context.cookieStoreId}.`);
  createContextUrls(context);
}

function onError(e) {
  console.error(e);
}

function onCreate() {
  console.error("Context not found, creating one...");
  browser.contextualIdentities.create({
    name: "Google2",
    color: "green",
    icon: "fingerprint"
  }).then(onCreated, onError);
}

function onGot(context) {
  console.log(`Name: ${context.name}`);
}

function createContextUrls(identity) {
  var div = document.getElementById('identity-list');
  let str = `
    <ul class="context">
      <li class="context__item">
        <button class="context__button">${identity.name}</button>
        <div class="pannel">
          <button class="pannel__button">Voltar</button>
          <ul class="pannel__list"></ul>
        </div>
      </li>
    </ul>
  `;
  div.innerHTML = str;
  let list = document.getElementsByClassName('pannel__list')[0];
  googleDomains.forEach((domain, i) => {
    let item = document.createElement('li');
    item.className = 'pannel__item';
    item.innerHTML = `<a class="pannel__link" href="${googleDomains[i]}">${googleDomains[i]}</a>`;
    list.appendChild(item);
  });

  $('body').on('click', '.context__button', function(e) {
    e.preventDefault();
    $('.context__button').hide();
    $(this).next('.pannel').css('display', 'flex');
  });

  $('body').on('click', '.pannel__button', function(e) {
    e.preventDefault();
    $('.pannel').hide();
    $('.context__button').show();
  });
};

function createOptions(url, node, identity) {
  console.log(url);
  let a = document.createElement('a');
  a.href = url;
  a.innerText = url;
  a.dataset.identity = identity.cookieStoreId;
  node.appendChild(a);
}

if (browser.contextualIdentities === undefined) {
  console.log('browser.contextualIdentities not available. Check that the privacy.userContext.enabled \
    pref is set to true, and reload the add-on.');
} else {
  const container = browser.contextualIdentities.get("Google2").then(onGot, onCreate);
}
