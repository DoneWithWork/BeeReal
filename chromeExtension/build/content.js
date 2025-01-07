(() => {
  let coupons;
  const iconURL = chrome.runtime.getURL('icons/128beeReal.png');
  const waitTime = 500;
  async function loadTranslations(lang) {
    const url = chrome.runtime.getURL(`_locales/${lang}/messages.json`);

    try {
      const response = await fetch(url);
      console.log('response', response);

      const translations = await response.json();
      return translations;
    } catch (error) {
      console.error('Failed to load translations:', error);
      return {};
    }
  }
  async function fetchCoupons(domain) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(
        { action: 'getCoupons', domain },
        (response) => {
          if (response && response.coupons) {
            coupons = response.coupons.codes;

            resolve();
          } else {
            reject('No coupons found');
          }
        }
      );
    });
  }
  function automaticInputFailedPopup() {
    chrome.runtime.sendMessage({ action: 'openPopup' });
  }
  function showPopUp() {
    const popUpHtml = `
       <div
      style="
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        background-color: #ffffff;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        padding: 15px;
        width: 370px;
      "
      id="coupon-popup"
    >
      <div
        style="
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          width: 100%;
          gap: 10px;
          font-family: 'Inter', sans-serif;
        "
      >
        <img src="${iconURL}" width="55" height="55" />
        <div>
          <h3 style="font-size: 20px; font-weight: bold; margin: 0">
            We Found Coupon Codes!
          </h3>
          <p
            style="
              font-size: 15px;
              color: darkslategray;
              font-weight: 500;
              margin: 0;
              margin-top: 5px;
            "
          >
            Try Our Auto Apply Feature
          </p>
        </div>
      </div>
      <div
        style="
          margin-top: 15px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          gap: 10px;
        "
      >
        <button
          style="
            background-color: hsl(221.2, 83.2%, 53.3%);
            font-size: 15px;
            border: none;
            box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
            font-weight: 600;
            padding: 14px 15px;
            border-radius: 6px;
            color: white;
            width: 150px;
            cursor: pointer;

          "
          id="apply-coupons-auto"
        >
          Apply Codes
        </button>
        <button
          style="
            font-size: 15px;
            border: 1px solid lightgray;
            box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
            font-weight: 300;
            padding: 12px 15px;
            border-radius: 6px;
            color: black;
            width: 150px;
            cursor: pointer;

          "
           id="ignore-coupons-auto"
        >
          Ignore
        </button>
      </div>
    </div>
    `;
    const body = document.querySelector('body');

    body.insertAdjacentHTML('beforeend', popUpHtml);

    // Add click events for these buttons
    document
      .getElementById('apply-coupons-auto')
      .addEventListener('click', async () => {
        document.getElementById('coupon-popup')?.remove();
        autoFillCoupons();
      });
    document
      .getElementById('ignore-coupons-auto')
      .addEventListener('click', () => {
        document.getElementById('coupon-popup')?.remove();
      });
  }
  function NoCouponsPopUp() {
    const noCouponPopUp = `
    <div
      style="
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        background-color: #ffffff;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        padding: 15px;
        width: 370px;
      "
      id="no-coupons-found-popup"
    >
      <div
        style="
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          width: 100%;
          gap: 10px;
          font-family: 'Inter', sans-serif;
        "
      >
        <img src="${iconURL}" width="55" height="55" />
        <div>
          <h3 style="font-size: 20px; font-weight: bold; margin: 0">
            Sorry. No Coupons Found.
          </h3>
          <p
            style="
              font-size: 15px;
              color: darkslategray;
              font-weight: 500;
              margin: 0;
              margin-top: 5px;
            "
          >
            Work in progress...
          </p>
        </div>
      </div>
      <div
        style="
          margin-top: 15px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          gap: 10px;
        "
      >
        <button
          style="
            background-color: hsl(221.2, 83.2%, 53.3%);
            font-size: 15px;
            border: none;
            box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
            font-weight: 600;
            padding: 14px 15px;
            border-radius: 6px;
            color: white;
            width: 150px;
            cursor: pointer;
          "
          id="open-extension"
        >
          Open Extension
        </button>
        <button
          style="
            font-size: 15px;
            border: 1px solid lightgray;
            box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
            font-weight: 300;
            padding: 12px 15px;
            border-radius: 6px;
            color: black;
            width: 150px;
            cursor: pointer;
          "
          id="close-extension"
        >
          Close
        </button>
      </div>
    </div>`;
    const body = document.querySelector('body');

    body.insertAdjacentHTML('beforeend', noCouponPopUp);

    // Add click events for these buttons
    document
      .getElementById('open-extension')
      .addEventListener('click', async () => {
        document.getElementById('  no-coupons-found-popup')?.remove();
        automaticInputFailedPopup();
      });
    document.getElementById('close-extension').addEventListener('click', () => {
      document.getElementById('no-coupons-found-popup')?.remove();
    });
  }

  function autoFillCoupons() {
    let bestPrice = 0;
    try {
      coupons.forEach((code) => {
        // Step 1: Find and click the promo button
        const promoButton = findPromoButton();
        if (!promoButton) {
          console.log('No promo buttons found.');
          automaticInputFailedPopup();
          return;
        }

        promoButton.click();

        // Step 2: Wait for promo input and apply coupon
        setTimeout(() => {
          const promoInput = findPromoInput();
          if (!promoInput) {
            console.log('No promo inputs found.');
            automaticInputFailedPopup();

            return;
          }

          applyCoupon(promoInput, code);

          // Step 3: Find and click the apply button
          const applyButton = findApplyButton();
          if (!applyButton) {
            console.log('No apply buttons found.');
            automaticInputFailedPopup();
            return;
          }

          applyButton.click();
          console.log('Successfully applied coupon.');
        }, waitTime);
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }

  function findPromoButton() {
    const buttons = document.querySelectorAll('button');
    return Array.from(buttons).find((button) => {
      const textContainsPromo = button.textContent
        .toLowerCase()
        .includes('promo');
      const attributesContainPromo = Array.from(button.attributes).some(
        (attr) => attr.value.toLowerCase().includes('promo')
      );
      return textContainsPromo || attributesContainPromo;
    });
  }

  function findPromoInput() {
    const inputs = document.querySelectorAll('input');
    return Array.from(inputs).find((input) =>
      input.placeholder.toLowerCase().includes('code')
    );
  }

  function applyCoupon(input, couponCode) {
    input.value = couponCode;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    console.log(`Coupon code "${couponCode}" applied.`);
  }

  function findApplyButton() {
    const buttons = document.querySelectorAll('button[type="submit"]');
    return Array.from(buttons).find((button) =>
      button.textContent.toLowerCase().includes('apply')
    );
  }

  async function main() {
    let domain = window.location.hostname.replace('www.', '');
    const path = window.location.pathname;
    try {
      await fetchCoupons(domain);
    } catch (err) {
      console.error('Failed to fetch coupons');
      return;
    }
    if (coupons.length === 0) {
      console.log('No coupons found');
      return;
    }
    const isCheckoutPath = [
      'checkout',
      'cart',
      'basket',
      'order',
      'payment',
    ].some((keyword) => path.includes(keyword));
    if (!isCheckoutPath) {
      console.log('Not a checkout page');
      return;
    }

    console.log('Coupons found: ', coupons);
    chrome.runtime.sendMessage({
      action: 'setBadgeText',
      text: coupons.length.toString(),
    });

    if (coupons.length === 0) {
      NoCouponsPopUp();
    } else {
      showPopUp();
    }
  }
  console.log('content.js loaded');

  setTimeout(() => {
    main().catch((err) => {
      console.error(err);
    });
  }, 2000);
})();
