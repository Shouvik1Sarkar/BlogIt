function handleSignUpPage(req, res) {
  res.render("signup");
}
function handleSignInPage(req, res) {
  res.render("signin");
}

export { handleSignUpPage, handleSignInPage };
