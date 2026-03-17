import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    profilePic: null
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('algoLendUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (e) => {
    const onlyNums = e.target.value.replace(/\D/g, '');
    setUser({ ...user, phone: onlyNums });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('algoLendUser', JSON.stringify(user));
    alert('Profile updated successfully!');
  };

  const handleLogout = () => {
    localStorage.removeItem('algoLendUser');
    navigate('/login');
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="text-center mb-5">
            <h2 className="fw-bold">My Profile</h2>
            <p className="text-muted">Review and edit your personal information.</p>
          </div>

          <Card className="border-0 shadow-sm rounded-4">
             <Card.Body className="p-4 p-md-5">
               <div className="text-center mb-4">
                 <div className="position-relative d-inline-block mb-3">
                   {user.profilePic ? (
                     <img src={user.profilePic} alt="Profile" className="rounded-circle object-fit-cover shadow-sm" style={{width: '100px', height: '100px'}} />
                   ) : (
                     <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center shadow-sm" style={{width: '100px', height: '100px'}}>
                       <User size={50} />
                     </div>
                   )}
                   <label htmlFor="photo-upload" className="position-absolute bottom-0 end-0 bg-white rounded-circle p-1 shadow-sm border cursor-pointer" style={{ cursor: 'pointer' }}>
                     <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{width: '24px', height: '24px'}}>
                        <span className="text-primary fw-bold" style={{fontSize: '14px'}}>+</span>
                     </div>
                   </label>
                   <input type="file" id="photo-upload" accept="image/*" className="d-none" onChange={handlePhotoUpload} />
                 </div>
                 <h4 className="fw-bold mb-1">{user.name}</h4>
                 <p className="text-muted mb-2">{user.email}</p>
               </div>

               <hr className="my-4 opacity-25" />

               <Form onSubmit={handleSubmit}>
                 <Row className="mb-3">
                   <Col sm={6}>
                     <Form.Group>
                       <Form.Label className="fw-semibold small">Full Name</Form.Label>
                       <Form.Control type="text" name="name" value={user.name || ''} onChange={handleChange} className="rounded-3" required />
                     </Form.Group>
                   </Col>
                   <Col sm={6}>
                     <Form.Group>
                       <Form.Label className="fw-semibold small">Email Address</Form.Label>
                       <Form.Control type="email" name="email" value={user.email || ''} onChange={handleChange} className="rounded-3" required />
                     </Form.Group>
                   </Col>
                 </Row>

                 <Row className="mb-4">
                   <Col sm={6}>
                     <Form.Group className="mb-3 mb-sm-0">
                       <Form.Label className="fw-semibold small">Phone Number</Form.Label>
                       <Form.Control type="text" name="phone" value={user.phone || ''} onChange={handlePhoneChange} placeholder="Enter your Mobile number" className="rounded-3" />
                     </Form.Group>
                   </Col>
                   <Col sm={6}>
                     <Form.Group>
                       <Form.Label className="fw-semibold small">Location</Form.Label>
                       <Form.Control type="text" name="location" value={user.location || ''} onChange={handleChange} placeholder="Enter your location" className="rounded-3" />
                     </Form.Group>
                   </Col>
                 </Row>

                 <div className="d-flex justify-content-between">
                   <Button variant="outline-danger" className="rounded-pill px-4 fw-semibold" onClick={handleLogout}>
                     Log Out
                   </Button>
                   <Button variant="primary" type="submit" className="rounded-pill px-5 fw-bold shadow-sm">
                     Save Changes
                   </Button>
                 </div>
               </Form>
             </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
