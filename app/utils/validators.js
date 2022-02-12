
const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regEx)) return true;
    else return false;
  };

  const isPassword8 = (string) => {

    if (String(string).length < 8) return true;
    else return false;
  };


const isBD = (data) => {
  console.log(Number(new Date().getFullYear() - new Date(data).getFullYear()))
  if(new Date(data).getFullYear() == new Date().getFullYear()) return true;
  if(Number(new Date().getFullYear() - new Date(data).getFullYear()) < 18) return true
  else false
}
  

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

  const isMobile = (string) => {
    if(!string) return false;
    if (String(string).trim() === '') return false;
    if (String(string).trim().charAt(0) !== '9' ) return true;
    if (String(string).trim().length !== 10) return true;
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
  
    if (isEmpty(data.username)) errors.username = 'Username must not be empty';
    if (isEmpty(data.password)) errors.password = 'Password must be empty';

  
    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false
    };
  };

  exports.validateSignupData = (data) => {
    let errors = {};
  
    if (isEmpty(data.username)) errors.username = 'Username must not be empty';
    if (isEmpty(data.password)) errors.password = 'Password must be empty';
    if (isPassword8(data.password)) errors.password = 'Password must be 8 characters';
    if (isEmpty(data.supporterId)) errors.supporterId = 'Re-input basic details';
    if (isEmpty(data.roles)) errors.roles= 'Role must not be empty';
    if (isEmpty(data.areaCode)) errors.areaCode = 'Designated area must not be empty';
    

    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false
    };
  };


  exports.validateSupporterDetails = (data) => {
    let errors = {};
    
    if (isEmpty(data.firstName)) errors.firstName = 'First Name must not be empty';
    if (isEmptyArray(data.lastName)) errors.lastName = 'Last Name must not be empty';
    // if (isEmpty(data.contact)) errors.contact = 'Mobile must not be empty';
    if (isMobile(data.contact)) errors.contact = 'Invalid! must be (ex: 9xx xxx xxxx)';
    if (isEmpty(data.brgyCode)) errors.brgyCode = 'Barangay must not be empty';
    if (isEmpty(data.regCode)) errors.regCode = 'Region must not be empty';
    if (isEmpty(data.citymunCode)) errors.citymunCode = 'City/Municipality must not be empty';
    if (isEmpty(data.provCode)) errors.provCode = 'Province must not be empty';
    // if (isEmpty(data.birthDate)) errors.birthDate = 'Birth Year must not be empty';
    // if (isBD(data.birthDate)) errors.birthDate = 'Birth Year not legal';

    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false
    };
  };

  exports.validatePsgc = (data) => {
    let errors = {};
    
    if (isEmpty(data.brgyCode)) errors.brgyCode = 'Barangay must not be empty';
    if (isEmpty(data.regCode)) errors.regCode = 'Region must not be empty';
    if (isEmpty(data.citymunCode)) errors.citymunCode = 'City/Municipality must not be empty';
    if (isEmpty(data.provCode)) errors.provCode = 'Province must not be empty';
    // if (isEmpty(data.birthDate)) errors.birthDate = 'Birth Year must not be empty';
    // if (isBD(data.birthDate)) errors.birthDate = 'Birth Year not legal';

    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false
    };
  };

  exports.validateMapDetails = (data) => {
    let errors = {};
    
    if (isEmpty(data.lat) || isEmpty(data.lng) || (data.lat == 0 && data.lng == 0)) errors.coordinates = 'Please Click on the map.';
    if (isEmpty(data.id)) errors.basic = 'Please Input Basic Details';

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
  


  