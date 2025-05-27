console.log('🔍 Sistemski test počinje...');

const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const service = new chrome.ServiceBuilder(require('chromedriver').path);
const options = new chrome.Options();

(async function rezervacijaTest() {
  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .setChromeService(service)
    .build();

  try {
    console.log('➡️ Otvaram login stranicu...');
    await driver.get('http://localhost:3000/login');

    console.log('🧾 Unosim podatke za prijavu...');
    await driver.findElement(By.name('email')).sendKeys('test@test.com');
    await driver.findElement(By.name('password')).sendKeys('lozinka123');
    await driver.findElement(By.css('button[type="submit"]')).click();

    console.log('⏳ Čekam preusmjerenje na /rezervacija...');
    await driver.wait(until.urlContains('/rezervacija'), 10000);

    console.log('➡️ Otvaram stranicu za rezervaciju...');
    await driver.get('http://localhost:3000/rezervacija');

    const today = new Date();
    today.setDate(today.getDate() + 1);
    const day = today.getDate().toString();

    console.log(`📅 Odabirem datum: ${day}`);
    await driver.wait(until.elementLocated(By.css('.react-calendar')), 10000);
    const dan = await driver.findElement(By.xpath(`//button[not(@disabled) and contains(@class, "react-calendar__tile")]`));
    await dan.click();
    
    console.log('🕓 Odabirem vrijeme...');
    await driver.sleep(1000);
    const prviTermin = await driver.findElement(By.xpath(`//div[contains(@class, "select-card")]`));
    await prviTermin.click();

    console.log('🪑 Odabirem stol...');
    await driver.sleep(1000);
    await driver.findElement(By.xpath(`//div[contains(text(),"Stol 1")]`)).click();

    console.log('📦 Potvrđujem odabir...');
    await driver.findElement(By.xpath(`//button[contains(text(),"ODABERI")]`)).click();

    console.log('📄 Čekam prikaz sažetka...');
    await driver.wait(until.elementLocated(By.xpath(`//h4[contains(text(),"Sažetak")]`)), 10000);

    console.log('📬 Potvrđujem rezervaciju...');
    await driver.findElement(By.xpath(`//button[contains(text(),"POTVRDI")]`)).click();

    console.log('✅ Čekam potvrdu da je rezervacija poslana...');
    await driver.wait(until.elementLocated(By.xpath(`//h4[contains(text(),"Rezervacija je poslana")]`)), 10000);

    console.log('🎉 TEST USPJEŠAN: Rezervacija je uspješno poslana!');
  } catch (err) {
    console.error('❌ Sistemski test nije uspio!');
    console.error(err);
  } finally {
    await driver.quit();
    console.log('🧹 Zatvaram browser.');
  }
})();
