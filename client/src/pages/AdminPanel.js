import { Col, Container, Row } from "react-bootstrap";
import BicycleList from "../components/BicycleList";
import AddBicycleForm from "../components/AddBicycleForm";
import BicyclesStats from "../components/BicyclesStats";
import { useContext, useEffect } from "react";
import { Context } from "..";
import { getBicycles } from "../http/bicycleApi";

const AdminPanel = () => {
    const {bicycle} = useContext(Context);
    useEffect(() => {
        async function fetchData() {
            try {
                getBicycles().then((data) => {
                    bicycle.setBicycles(data.bicycles);
                    bicycle.setStats(data.stats);
                })
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchData();
      }, [bicycle])
  return (
    <Container className='d-flex flex-column admin-panel-wrapper'>
        <Row className="row-main-content">
            <div className="layout-bar header ps-3 fs-4 text-uppercase">ADMIN.BIKE-BOOKING.COM</div>    
            <Col className="border-end bicycle-list-column" md={7}>
                <BicycleList />
            </Col>
            <Col md={5}>
                <AddBicycleForm />
                <BicyclesStats />
            </Col>
            <div className="layout-bar text-end fs-4 mt-auto">
                <span className="text-white-50">Developer: </span> 
                <span>Yeva Suslova</span>
            </div>
        </Row>
    </Container>
  );
}

export default AdminPanel;
