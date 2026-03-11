const mockProfiles = [
  {
    id: 'profile-new',
    customerType: 'new',
    riskLevel: 'normal',
    firstName: 'Robert',
    lastName: 'Junior',
    email: 'Robert.junior@gmail.com',
    phone: '(999) 888-9999',
    shippingAddress: {
      line1: '3075 loyalty cir',
      city: 'Columbus',
      region: 'OH',
      postalCode: '43219'
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