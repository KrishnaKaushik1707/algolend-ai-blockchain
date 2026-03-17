import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { User, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserProfileCard = ({ user }) => {
  return (
    <Card className="border-0 shadow-sm rounded-4">
      <Card.Body className="p-4">
        <div className="text-center mb-4">
          <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '80px', height: '80px'}}>
            <User size={40} />
          </div>
          <h4 className="fw-bold mb-1">{user.name}</h4>
          <p className="text-muted mb-2">Member since {user.memberSince}</p>
          <Badge bg="success" className="rounded-pill px-3 py-2 fw-medium">
            <ShieldCheck size={14} className="me-1" />
            Verified Borrower
          </Badge>
        </div>

        <hr className="my-4 text-muted opacity-25" />

        <div className="mb-4">
          <h6 className="fw-bold text-uppercase text-muted small mb-3">Contact Information</h6>
          <div className="d-flex align-items-center mb-3">
            <Mail size={18} className="text-muted me-3" />
            <span className="fw-medium">{user.email}</span>
          </div>
          <div className="d-flex align-items-center mb-3">
            <Phone size={18} className="text-muted me-3" />
            <span className="fw-medium">{user.phone}</span>
          </div>
          <div className="d-flex align-items-center">
            <MapPin size={18} className="text-muted me-3" />
            <span className="fw-medium">{user.location}</span>
          </div>
        </div>

        <Button as={Link} to="/profile" variant="light" className="w-100 fw-semibold text-primary py-2 rounded-pill mt-2">
          Edit Profile
        </Button>
      </Card.Body>
    </Card>
  );
};

export default UserProfileCard;
