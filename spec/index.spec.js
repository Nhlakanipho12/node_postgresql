
const {createTable,addNewVisitor,viewAllVisitors,updateVisitor,deleteVisitor,viewVisitor,deleteAllVisitors} = require('../src/index');

describe('bd', () => {
  
  //drops a table if it exixts, then create a new one
  beforeAll(async function(done) {
      await createTable('visitors');
      await addNewVisitor('Thulani Khoza',21,'2020-02-10','11:30','Melusi','No comments');
      await addNewVisitor('Sanele Nxumalo',21,'2020-02-10','11:30','Melusi','No comments');
    done();

  });
  afterEach( function() {
    setTimeout( async function(done) {
    await viewVisitor();
    await viewAllVisitors();
    await updateVisitor();
    done();
    }, 1000);    

  });

  afterAll(  function() {
    setTimeout( async function(done) {
      await deleteVisitor();
      await deleteAllVisitors();
      done();
  
    }, 5000);

  });

//inserts data to the newly created table
    describe('addNewVisitor', () => {

      it('should insert and save data into the table', async (done) => {
        res = await addNewVisitor('Tadiwa Zingoni',21,'2020-02-10','11:30','Melusi','No comments');
        expect(Object.values(res[0])).toContain('Tadiwa Zingoni',21,'2020-02-10','11:30','Melusi','No comments');
        done();
      });
    });
    
    //displays visitor's info by selecting user ID
    describe('viewVisitor', () => {
    it('should select user id and display visitor info  from the table', async (done) => {
      const res = await viewVisitor(1);
      //console.log(res,'testing');
      expect(res).toEqual([{ id: 1, visitor_name: 'Thulani Khoza', visitor_age: 21, date_of_visit: '2020-02-10', time_of_visit: '11:30:00', assistant: 'Melusi', comments: 'No comments' }]);
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
        const res = await updateVisitor(2,'Senzo Meyiwa',21,'2020-02-10','11:30','Melusi','No comments');
        expect(res).toEqual([{ id: 2, visitor_name: 'Senzo Meyiwa', visitor_age: 21, date_of_visit: '2020-02-10', time_of_visit: '11:30:00', assistant: 'Melusi', comments: 'No comments' }]);
        done();
      });
    });
  
    describe('deleteVisitor', () => {
      it('should delete visitor', async (done) => {
        const res  = await deleteVisitor('Tadiwa Zingoni');
        expect(res).toEqual([ ]);
        done();
      });
    });

  });
