import mongoose from 'mongoose';

// Define the course Detail schema
const courseDetailsSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  sessionoryear: { type: Date },
});

// Define the personal Detail schema
const personalDetailSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  dateOfBirth: { type: String, required: true, trim: true },
  gender: { type: String, required: true },
  nationality: { type: String, required: true, trim: true },
});

// Define the contactdetail Detail schema
const contactDetailSchema = new mongoose.Schema({
  correspondenceAddress: { type: String, required: true, trim: true },
  mobileNumber: { type: String, required: true },
  emailId: { type: String, required: true, trim: true },
  fatherName: { type: String, required: true, trim: true },
});


// Define educational Detail schema
const educationalSchema = new mongoose.Schema({
  
  tenth: {
    nameOfSchool: { type: String, required: true },
    board: { type: String, required: true },
    yearOfPassing: { type:String, required: true },
    subjects: [{ type: String, required: true }],
    percentage: { type: Number, required: true },
  },
  twelfth: {
    nameOfCollege: { type: String, required: true },
    board: { type: String, required: true },
    yearOfPassing: { type: String, required: true },
    subjects: [{ type: String, required: true }],
    percentage: { type: Number, required: true },
  },
  graduation: {
    nameOfCollege: { type: String, required: true },
    board: { type: String, required: true },
    yearOfPassing: { type: String, required: true },
    subjects: [{ type: String, required: true }],
    percentage: { type: Number, required: true },
  },
});

// Define the Main schema
// combines the previously defined schemas to create a main schema for a patient

const studentSchema = new mongoose.Schema({
  courseDetails: { type: courseDetailsSchema},
  personalDetails:{type:personalDetailSchema},
  contactDetails: { type: contactDetailSchema },
  educationalDetails: { type: [educationalSchema] },                                   
});



const studentModel = mongoose.model('student', studentSchema);

export default studentModel;
