import { useContext} from "react";
import { observer } from "mobx-react-lite";
import { ListGroup } from "react-bootstrap";
import statusTitles from '../utils/statusTitles.json'
import { Context } from "..";

const BicyclesStats = observer(() => {
    const {bicycle} = useContext(Context);
    return (
        <ListGroup>
            <span className="fw-bold fs-5 text-uppercase">statistics</span>
            <ListGroup.Item className="stats-list-item">Total Bikes: <b>{bicycle.stats.totalCount}</b></ListGroup.Item>
            {bicycle.stats.statusStats?.map(stat => 
                <ListGroup.Item className="stats-list-item">{statusTitles[stat.status]?.title}Bikes: <b>{stat.count}</b></ListGroup.Item>
            )}
            <ListGroup.Item className="stats-list-item">Average bike cost: <b>{(bicycle.stats.priceStats?.average)?.toFixed(1)}</b> UAH/hr</ListGroup.Item>
        </ListGroup>
      );
})

export default BicyclesStats;