import { useContext } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

import { createBicycle } from "../http/bicycleApi";
import { Context } from "..";

const AddBicycleForm = () => {
    const {bicycle} = useContext(Context);

    const validationSchema = Yup.object({
      name: Yup.string().min(5, "Minimum 5 characters").required("Required"),
      type: Yup.string().min(5, "Minimum 5 characters").required("Required"),
      color: Yup.string().min(5, "Minimum 5 characters").required("Required"),
      wheelSize: Yup.number().typeError("Must be a number").required("Required").positive("Must be a positive number"),
      price: Yup.number().typeError("Must be a number").required("Required").positive("Must be a positive number"),
      ID: Yup.string().min(5, "Minimum 5 characters").required("Required"),
      description: Yup.string().min(5, "Minimum 5 characters").required("Required"),
    });

    const formik = useFormik({
      initialValues: {
        name: '',
        type: '',
        color: '',
        wheelSize: '',
        price: '',
        ID: '',
        description: '',
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        try {
          createBicycle(values).then((data) => {
            bicycle.setBicycles(data.bicycles);
            bicycle.setStats(data.stats);
          });
        } catch (error) {
          console.log(error.message);
        }
      },
    });

    return (
      <Form className="mt-2" noValidate onSubmit={formik.handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="6">
            <Form.Control
              required
              type="text"
              placeholder="Name"
              className="input-item"
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="error-message">{formik.errors.name}</div>
            )}
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Control
              required
              type="text"
              placeholder="Type"
              className="input-item"
              {...formik.getFieldProps("type")}
            />
            {formik.touched.type && formik.errors.type && (
              <div className="error-message">{formik.errors.type}</div>
            )}
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6">
            <Form.Control 
              type="text" 
              placeholder="Color" 
              className="input-item" 
              required
              {...formik.getFieldProps("color")}
            />
            {formik.touched.color && formik.errors.color && (
              <div className="error-message">{formik.errors.color}</div>
            )}
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Control 
              type="number" 
              placeholder="Wheel size" 
              className="input-item" 
              required
              {...formik.getFieldProps("wheelSize")}
            />
            {formik.touched.wheelSize && formik.errors.wheelSize && (
              <div className="error-message">{formik.errors.wheelSize}</div>
            )}
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6">
            <Form.Control 
              type="number" 
              placeholder="Price" 
              className="input-item" 
              required
              {...formik.getFieldProps("price")}
            />
            {formik.touched.price && formik.errors.price && (
              <div className="error-message">{formik.errors.price}</div>
            )}
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Control 
              type="text"
              placeholder="ID (slug) XXXXXXXXXXXXXXXX" 
              className="input-item" 
              required
              {...formik.getFieldProps("ID")}
            />
            {formik.touched.ID && formik.errors.ID && (
              <div className="error-message">{formik.errors.ID}</div>
            )}
          </Form.Group>
        </Row>
        <Row className="mb-3">
            <Form.Group md={12}>
                <textarea 
                  className="form-control input-description input-item" 
                  placeholder="Description"
                  {...formik.getFieldProps("description")}
                >  
                </textarea>
                {formik.touched.description && formik.errors.description && (
                  <div className="error-message">{formik.errors.description}</div>
                )}
            </Form.Group>
        </Row>
            <div className="mb-3 d-flex justify-content-between">
                <Button className="form-button" type="submit">Save</Button>
                <Button className="form-button" type="button" onClick={formik.resetForm}>Clear</Button>
            </div>
      </Form> 
    ); 
}

export default AddBicycleForm;