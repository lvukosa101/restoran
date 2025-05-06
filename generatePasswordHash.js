const bcrypt = require('bcryptjs');

const lozinka = '123';

bcrypt.hash(lozinka, 10, (err, hash) => {  
  if (err) throw err; 

  console.log('Hashirana lozinka:', hash); 
});
