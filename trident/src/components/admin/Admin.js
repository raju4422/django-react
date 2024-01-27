import { connect } from "react-redux";
import AdminLayout from "./AdminLayout";
import { Navigate } from "react-router-dom";

function Admin({ local_state }) {
  const { common } = local_state;

  return (
    <div>
      {common.isLogged ? <AdminLayout  /> : <Navigate to="/login" />}
    </div>
  );
}
const mapStateToProps = (state) => ({
  local_state: state,
});
export default connect(mapStateToProps,{})(Admin);
