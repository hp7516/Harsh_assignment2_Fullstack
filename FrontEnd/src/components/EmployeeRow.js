import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Info,PencilFill, Trash } from "react-bootstrap-icons";


const EmployeeRow = ({ style, employee, setDeleteEmployeeId }) => {
    return (
        <tr>
            {Object.entries(employee).map((entry) => {
                if (entry[0] !== "__typename" && entry[0] !== "id") {
                    let value = entry[1];
                    if (entry[0] === "dateOfJoining") {
                        value = entry[1] ? entry[1] : "Not Defined";
                    }
                    return (
                        <td key={entry[0]} style={style}>
                            {value}
                        </td>
                    );
                }
                return null;
            })}
            <td style={style}>
                <Button className="info">
                    <Link className="info" to={`/employeelist/${employee.id}`} ><Info style={{ fill: "White" }}/></Link>
                </Button>
            </td>
            <td style={style}>
                <Button variant="success">
                    <Link  to={`/employeelist/update/${employee.id}`}>
                    <PencilFill style={{ fill: "White" }} />
                    </Link>
                </Button>
            </td>
            <td style={style}>
                <Button variant="danger" onClick={() => setDeleteEmployeeId(employee.id)}>
                    <Trash size="1.5em" />
                </Button>
            </td>
        </tr>
    );
};
export default EmployeeRow;
