import joi from "joi";

function signUpValidation(req, res, next) {
  const schema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
  });

  const { name, email, password } = req.body;

  const validation = schema.validate(
    { name, email, password },
    { abortEarly: false }
  );
  if (validation.error) {
    const messages = [];
    validation.error.details.forEach(e => {
      messages.push(e.message);
    });

    res.status(422).send(messages);
    return;
  }
  next();
}

function signInValidation(req, res, next) {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  });

  const { email, password } = req.body;

  const validation = schema.validate(
    { email, password },
    { abortEarly: false }
  );
  if (validation.error) {
    const messages = [];
    validation.error.details.forEach(e => {
      messages.push(e.message);
    });

    res.status(422).send(messages);
    return;
  }
  next();
}
export { signUpValidation, signInValidation };