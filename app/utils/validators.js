
const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regEx)) return true;
    else return false;
  };

  const isEmptyArray = (arr) => {

    if(!arr) return true;
    if (arr.length === 0) return true;
    else return false;

  }
  
  const isEmpty = (string) => {
    if(!string) return true;
    if (String(string).trim() === '') return true;
    else return false;
  };

  const isNotLogin = (string) => {
    console.log(string)
    let logins = ['googleId', 'facebookId', 'mobile'];
      let ind = logins.indexOf(string);
      if(ind === -1) return true;
      else return false;
  };


  exports.validateLoginData = (data) => {
    let errors = {};
  
    if (isEmpty(data.id)) errors.id = 'ID Must not be empty';
    if (isEmpty(data.type)) errors.type = 'User type must not be empty';
    if (isNotLogin(data.loginType)) errors.loginType = 'Login type must be valid';
    if (isEmpty(data.loginType)) errors.loginType = 'Login type must not be empty';

  
    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false
    };
  };


  exports.validateMerchantDetails = (data) => {
    let errors = {};
    
    if (isEmpty(data.name)) errors.name = 'Name must not be empty';
    if (isEmptyArray(data.operatingDay)) errors.operatingDay = 'Set Operating Days';
    if (isEmpty(data.mobile)) errors.mobile = 'Mobile must not be empty';
    if (isEmpty(data.locationId)) errors.locationId = 'Location must not be empty';
    
    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false
    };
  };


  exports.validateServices = (data) => {
    let errors = {};
    
    if (isEmpty(data.id)) errors.id = 'ID Must not be empty';
    if (isEmpty(data.type)) errors.type = 'User type must not be empty';
    if (isNotLogin(data.loginType)) errors.loginType = 'Login type must be valid';
    if (isEmpty(data.loginType)) errors.loginType = 'Login type must not be empty';
    if (isEmptyArray(data.operatingHours)) errors.operatingHours = 'Set Operating hours';
    if (isEmptyArray(data.services)) errors.services = 'Services must not be empty';
    if (isEmptyArray(data.products)) errors.products = 'Products must not be empty';


    
    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false
    };
  };
  

  exports.validateProducts = (data) => {
    let errors = {};
    
    if (isEmpty(data.id)) errors.id = 'ID Must not be empty';
    if (isEmpty(data.type)) errors.type = 'User type must not be empty';
    if (isNotLogin(data.loginType)) errors.loginType = 'Login type must be valid';
    if (isEmpty(data.loginType)) errors.loginType = 'Login type must not be empty';
    if (isEmptyArray(data.operatingHours)) errors.operatingHours = 'Set Operating hours';
    if (isEmptyArray(data.services)) errors.services = 'Services must not be empty';
    if (isEmptyArray(data.products)) errors.products = 'Products must not be empty';


    
    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false
    };
  };
  


  