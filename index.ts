enum StudentStatus {
  Active = "Active",
  Academic_Leave = "Academic_Leave",
  Graduated = "Graduated",
  Expelled = "Expelled",
}

enum CourseType {
  Mandatory = "Mandatory",
  Optional = "Optional",
  Special = "Special",
}

enum Semester {
  First = "First",
  Second = "Second",
}

enum GradeEnum {
  Excellent = 5,
  Good = 4,
  Satisfactory = 3,
  Unsatisfactory = 2,
}

enum Faculty {
  Computer_Science = "Computer_Science",
  Economics = "Economics",
  Law = "Law",
  Engineering = "Engineering",
}

interface Student {
  id: number;
  fullName: string;
  faculty: Faculty;
  year: number;
  status: StudentStatus;
  enrollmentDate: Date;
  groupNumber: string;
}

interface Course {
  id: number;
  name: string;
  type: CourseType;
  credits: number;
  semester: Semester;
  faculty: Faculty;
  maxStudents: number;
}

interface Grade {
  studentId: number;
  courseId: number;
  grade: GradeEnum;
  date: Date;
  semester: Semester;
}

class UniversityManagementSystem {
  private students: Student[] = [];
  private courses: Course[] = [
    {
      id: 1,
      name: "Introduction to Programming",
      type: CourseType.Mandatory,
      credits: 5,
      semester: Semester.First,
      faculty: Faculty.Computer_Science,
      maxStudents: 2,
    },
  ];
  private grades: Grade[] = [];
  private studentCounter: number = 1;

  enrollStudent(student: Omit<Student, "id">): Student {
    const newStudent: Student = { id: this.studentCounter++, ...student };
    this.students.push(newStudent);
    return newStudent;
  }

  registerForCourse(studentId: number, courseId: number): void {
    const student = this.students.find((s) => s.id === studentId);
    const course = this.courses.find((c) => c.id === courseId);

    if (!student || !course) {
      throw new Error("Invalid student or course ID");
    }

    if (course.faculty !== student.faculty) {
      throw new Error(
        "Student cannot register for courses from another faculty"
      );
    }

    const enrolledStudents = this.grades.filter(
      (g) => g.courseId === courseId
    ).length;
    if (enrolledStudents >= course.maxStudents) {
      throw new Error("Course has reached the maximum number of students");
    }
  }

  setGrade(studentId: number, courseId: number, grade: GradeEnum): void {
    const student = this.students.find((s) => s.id === studentId);
    const course = this.courses.find((c) => c.id === courseId);

    if (!student || !course) {
      throw new Error("Invalid student or course ID");
    }

    this.grades.push({
      studentId,
      courseId,
      grade,
      date: new Date(),
      semester: course.semester,
    });
  }

  updateStudentStatus(studentId: number, newStatus: StudentStatus): void {
    const student = this.students.find((s) => s.id === studentId);
    if (!student) {
      throw new Error("Student not found");
    }

    if (
      student.status === StudentStatus.Expelled &&
      newStatus !== StudentStatus.Academic_Leave
    ) {
      throw new Error("Expelled students can only be put on academic leave");
    }

    student.status = newStatus;
  }

  getStudentsByFaculty(faculty: Faculty): Student[] {
    return this.students.filter((s) => s.faculty === faculty);
  }

  getStudentGrades(studentId: number): Grade[] {
    return this.grades.filter((g) => g.studentId === studentId);
  }

  getAvailableCourses(faculty: Faculty, semester: Semester): Course[] {
    return this.courses.filter(
      (c) => c.faculty === faculty && c.semester === semester
    );
  }

  calculateAverageGrade(studentId: number): number {
    const grades = this.getStudentGrades(studentId);
    if (grades.length === 0) return 0;

    const total = grades.reduce((sum, g) => sum + g.grade, 0);
    return total / grades.length;
  }
}

const ums = new UniversityManagementSystem();

const student = ums.enrollStudent({
  fullName: "John Doe",
  faculty: Faculty.Computer_Science,
  year: 1,
  status: StudentStatus.Active,
  enrollmentDate: new Date(),
  groupNumber: "CS-101",
});

console.log("New student:", student);

ums.registerForCourse(student.id, 1);

ums.setGrade(student.id, 1, GradeEnum.Excellent);

console.log("Середня оцінка студента:", ums.calculateAverageGrade(student.id));
