const mockProfiles = [
  {
    id: 'profile-new',
    customerType: 'new',
    riskLevel: 'normal',
    firstName: 'Emily',
    lastName: 'Carter',
    email: 'emily.carter@gmail.com',
    phone: '(614) 555-2193',
    shippingAddress: {
      line1: '1184 Summit Park Dr',
      city: 'Columbus',
      region: 'OH',
      postalCode: '43004'
    },
    rewardsMember: false
  },
  {
    id: 'profile-existing',
    customerType: 'existing',
    riskLevel: 'normal',
    firstName: 'David',
    lastName: 'Mitchell',
    email: 'david.mitchell@gmail.com',
    phone: '(614) 555-8832',
    shippingAddress: {
      line1: '420 Riverside Crossing',
      city: 'Dublin',
      region: 'OH',
      postalCode: '43017'
    },
    rewardsMember: true,
    cardLast4: '4821'
  },
  {
    id: 'profile-risk',
    customerType: 'risk',
    riskLevel: 'high',
    firstName: 'Kevin',
    lastName: 'Brooks',
    email: 'kevin.temp@fastmail.cc',
    phone: '(917) 555-9921',
    shippingAddress: {
      line1: '900 Market Street',
      city: 'New York',
      region: 'NY',
      postalCode: '10012'
    },
    rewardsMember: false
  }
];

export default mockProfiles;