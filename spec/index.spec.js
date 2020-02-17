
const {createTable,addNewVisitor,viewAllVisitors,updateVisitor,deleteVisitor,viewVisitor,deleteAllVisitors} = require('../src/index');

describe('bd', () => {
  //drops a table if it exixts, then create a new one
  beforeAll(async function(done) {
    await createTable('visitors');
    done();

  });
  afterEach(async function(done) {
    await addNewVisitor('Tadiwa Zingoni',21,'2020-02-10','11:30','Melusi','No comments');
    await viewVisitor();
    await viewAllVisitors();
    done();
  });

  afterAll( async function(done) {
    await deleteVisitor();
    await deleteAllVisitors();
    done()
  });

  });

//inserts data to the newly created table
    describe('addNewVisitor', () => {

      it('should insert and save data into the table', async (done) => {
        const res = await addNewVisitor('Tadiwa Zingoni',21,'2020-02-10','11:30','Melusi','No comments');
        //const moreRes = await addNewVisitor('Thulani Khoza',21,'2020-02-10','11:30','Melusi','No comments');
        expect(Object.values(res[0])).toContain('Tadiwa Zingoni',21,'2020-02-10','11:30','Melusi','No comments');
        done();
      });
    });
    
    //displays visitor's info by selecting user ID
    describe('viewVisitor', () => {
    it('should select user id and display visitor info  from the table', async (done) => {
      const res = await viewVisitor(1);
      expect(res).toEqual([{ id: 1, visitor_name: 'Senzo Meyiwa', visitor_age: 21, date_of_visit: '2020-02-10', time_of_visit: '11:30:00', assistant: 'Melusi', comments: 'No comments' }]);
      done();
    })
    });
    // displays visitor ID and name
    describe('viewAllVisitors', () => {
      it('should display visitor id and name', async (done) => {
        const res = await viewAllVisitors();
        expect(res).toEqual(Object.values(res));
        done();
      });
  
    });
    //uses visitor ID to to update info
    describe('updateVisitor', () => {
      it('should update data by selecting the visitor id', async (done) => {
        const res = await updateVisitor(1,'Senzo Meyiwa',21,'2020-02-10','11:30','Melusi','No comments');
        expect(res).toEqual([{ id: 1, visitor_name: 'Senzo Meyiwa', visitor_age: 21, date_of_visit: '2020-02-10', time_of_visit: '11:30:00', assistant: 'Melusi', comments: 'No comments' }]);
        done();
      });
    });
  
    describe('deleteVisitor', () => {
      it('should delete visitor', async (done) => {
        const res  = await deleteVisitor('Senzo Meyiwa');
        expect(res).toEqual([ ]);
        done();
      });
    });
  
    describe('deleteAllVisitors', () => {
      it('should delete all visitors', async (done) => {
        const res  = await deleteAllVisitors();
        expect(res.rowCount).toEqual(0);
        done();
      });
    });