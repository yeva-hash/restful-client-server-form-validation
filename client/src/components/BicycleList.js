import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { CloseButton, Dropdown, DropdownButton, ListGroup } from "react-bootstrap";
import { deleteBicycle, updateStatus } from "../http/bicycleApi";
import statusTitles from '../utils/statusTitles.json'
import { Context } from "..";

const BicycleList = observer(() => {
    const {bicycle} = useContext(Context);

  const handleAction = (callback, params) => {
    try {
        callback(params).then((data) => {
            bicycle.setBicycles(data.bicycles);
            bicycle.setStats(data.stats);
        })
    } catch (error) {
        console.log(error.message)
    }
  }

  return (
    <ListGroup>
        {bicycle.bicycles.map(bicycle => 
            <ListGroup.Item
                disabled={bicycle.status === '-1'}
                className={`border ${statusTitles[bicycle.status]?.borderClass} 
                            border-2 rounded-4 my-2 d-flex justify-content-between`}
                key={bicycle.ID}
            >    
                <div className="d-flex flex-column">
                    <span> <b>{bicycle.name.toUpperCase()}</b> - {bicycle.type}({bicycle.color})</span>
                    <span className="text-secondary mt-2" style={{ fontSize: '9px' }}> ID: {bicycle.ID}</span>
                    <div className="d-flex align-items-center"> 
                        <span>STATUS: </span> 
                        <DropdownButton 
                            variant={''} 
                            id="dropdown-basic-button" 
                            title={statusTitles[bicycle.status]?.title || "Unknown"}
                            className="p-0 auto-pointer-events"
                        >
                        {Object.entries(statusTitles).map(([status, { title }]) => (
                            <Dropdown.Item key={status} onClick={() => handleAction(updateStatus, {ID: bicycle.ID, status})}>
                                {title}
                            </Dropdown.Item>
                        ))}
                        </DropdownButton>
                    </div>
                </div>
                <div className="d-flex flex-column auto-pointer-events">
                    <CloseButton onClick={() => handleAction(deleteBicycle, bicycle.ID)} className="ms-auto" />
                    <span className="mt-auto fs-4">{bicycle.price} UAH/hr.</span>
                </div>
            </ListGroup.Item>
        )}
    </ListGroup>
  );
})

export default BicycleList;
