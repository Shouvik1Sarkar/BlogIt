import { getUser } from "../services/auth.services.js";

function checkLogInAuth(token) {
  return (req, res, next) => {
    console.log(" tokenCookiesValue------------");
    const tokenCookiesValue = req.cookies[token];
    console.log(" tokenCookiesValue", tokenCookiesValue);
    if (!tokenCookiesValue) {
      return next();
    }
    try {
      const userPayLoad = getUser(tokenCookiesValue);
      console.log("USERPAYLOADxxxxxxxxxxxxxxxxxxxxxxxxxx", userPayLoad);
      req.user = userPayLoad;
    } catch (error) {}
    return next();
  };
}
export { checkLogInAuth };
