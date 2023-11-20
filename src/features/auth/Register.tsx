import Box  from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import RegisterForm from "./register-form/RegisterForm";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FunctionComponent, useState, useCallback } from "react";
import useRedirectWhenRegistered from "./use-redirect-when-regristered";

const Register: FunctionComponent = () => {

  const { loading, onSubmit } = useRegister();
    return (
      <Box>
        <Typography>Register</Typography>
        <FormControl 
          margin="normal"
        >
          <RegisterForm disabled={loading} onSubmit={onSubmit}/>
        </FormControl>
      </Box>
    );
};

function useRegister() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useRedirectWhenRegistered();

  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      try {
        const result = await loginService({
          email,
          password,
        });
        dispatch(loginAction(result));
        navigate(`/profile/${result.id}`);
      } catch (error) {
        // Monstramos mensaje de error :)
      } finally {
        setLoading(false);
      }
    },
    [navigate, dispatch]
  );

  return { onSubmit, loading };
}


export default Register;