import joi from "joi";

function signUpValidation(req: any, res: any, next: any) {
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
    let message = "";
    validation.error.details.forEach((e) => {
      message += e.message + "\n";
    });

    res.status(422).send(message);
    return;
  }
  next();
}

function signInValidation(req: any, res: any, next: any) {
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
    let message = "";
    validation.error.details.forEach((e) => {
      message += e.message + "\n";
    });

    res.status(422).send(message);
    return;
  }
  next();
}
export { signUpValidation, signInValidation };
