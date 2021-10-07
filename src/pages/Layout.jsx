import { SideBar } from "../components/SideBar";

const MainLayout = (props) => (
  <>
    <div className="row my-3 px-3">
      <h1>Spatial Management Units</h1>
    </div>
    <div className="row">
      <div className="col-md-3 px-3">
        <SideBar />
      </div>
      <div className="col-md-9">{props.children}</div>
    </div>
  </>
);
