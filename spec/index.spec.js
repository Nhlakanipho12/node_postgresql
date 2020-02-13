
const {createTable,addNewVisitor,viewAllVisitors,updateVisitor,deleteVisitor,viewVisitor,deleteAllVisitors} = require('../src/index');

describe('createTable', () => {
    it('should create the table in the database', async (done) => {
      const res = await createTable('visitors');
       //expect(valueOf.res).toEqual(1);
       //console.log(res);
      done();
    });
  });
  
  describe('addNewVisitor', () => {
    it('should insert and save data into the table', async (done) => {
      const res = await addNewVisitor('Tadiwa Zingoni',21,'2020-02-10','11:30','Melusi','No comments');
      expect(Object.values(res[0])).toContain('Tadiwa Zingoni',21,'2020-02-10','11:30','Melusi','No comments');
      done();
    });
  });
  
  
  describe('viewVisitor', () => {
  it('should select items from the table', async (done) => {
    const res = await viewVisitor(1);
    console.log(Object.values(res[0]));
    expect(res).toEqual([{ id: 1, visitor_name: 'Tadiwa Zingoni', visitor_age: 21, date_of_visit: '2020-02-10', time_of_visit: '11:30:00', assistant: 'Melusi', comments: 'No comments' }]);
    done();
  })
  });