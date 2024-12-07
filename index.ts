// 1. Визначення базових типів
type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";

type TimeSlot =
  | "8:30-10:00"
  | "10:15-11:45"
  | "12:15-13:45"
  | "14:00-15:30"
  | "15:45-17:15";

type CourseType = "Lecture" | "Seminar" | "Lab" | "Practice";

// 2. Основні структури
type Professor = {
  id: number;
  name: string;
  department: string;
};

type Classroom = {
  number: string;
  capacity: number;
  hasProjector: boolean;
};

type Course = {
  id: number;
  name: string;
  type: CourseType;
};

type Lesson = {
  courseId: number;
  professorId: number;
  classroomNumber: string;
  dayOfWeek: DayOfWeek;
  timeSlot: TimeSlot;
};

// 3. Робота з масивами
const professors: Professor[] = [];
const classrooms: Classroom[] = [];
const courses: Course[] = [];
const schedule: Lesson[] = [];

// Додавання професора
function addProfessor(professor: Professor): void {
  professors.push(professor);
}

// Додавання заняття
function addLesson(lesson: Lesson): boolean {
  if (validateLesson(lesson) === null) {
    schedule.push(lesson);
    return true;
  }
  return false;
}

// 4. Функції пошуку та фільтрації
function findAvailableClassrooms(
  timeSlot: TimeSlot,
  dayOfWeek: DayOfWeek
): string[] {
  const occupiedClassrooms = schedule
    .filter(
      (lesson) => lesson.timeSlot === timeSlot && lesson.dayOfWeek === dayOfWeek
    )
    .map((lesson) => lesson.classroomNumber);

  return classrooms
    .filter((classroom) => !occupiedClassrooms.includes(classroom.number))
    .map((classroom) => classroom.number);
}

function getProfessorSchedule(professorId: number): Lesson[] {
  return schedule.filter((lesson) => lesson.professorId === professorId);
}

// 5. Обробка конфліктів
type ScheduleConflict = {
  type: "ProfessorConflict" | "ClassroomConflict";
  lessonDetails: Lesson;
};

function validateLesson(lesson: Lesson): ScheduleConflict | null {
  const professorConflict = schedule.find(
    (l) =>
      l.professorId === lesson.professorId &&
      l.dayOfWeek === lesson.dayOfWeek &&
      l.timeSlot === lesson.timeSlot
  );
  if (professorConflict) {
    return { type: "ProfessorConflict", lessonDetails: professorConflict };
  }

  const classroomConflict = schedule.find(
    (l) =>
      l.classroomNumber === lesson.classroomNumber &&
      l.dayOfWeek === lesson.dayOfWeek &&
      l.timeSlot === lesson.timeSlot
  );
  if (classroomConflict) {
    return { type: "ClassroomConflict", lessonDetails: classroomConflict };
  }

  return null;
}

// 6. Аналіз та звіти
function getClassroomUtilization(classroomNumber: string): number {
  const totalSlots = 5 * 5; // 5 днів на 5 слотів
  const occupiedSlots = schedule.filter(
    (lesson) => lesson.classroomNumber === classroomNumber
  ).length;

  return (occupiedSlots / totalSlots) * 100;
}

function getMostPopularCourseType(): CourseType {
  const typeCount: Record<CourseType, number> = {
    Lecture: 0,
    Seminar: 0,
    Lab: 0,
    Practice: 0,
  };

  schedule.forEach((lesson) => {
    const course = courses.find((course) => course.id === lesson.courseId);
    if (course) typeCount[course.type]++;
  });

  return Object.keys(typeCount).reduce((a, b) =>
    typeCount[a as CourseType] > typeCount[b as CourseType] ? a : b
  ) as CourseType;
}

// 7. Модифікація даних
function reassignClassroom(
  lessonId: number,
  newClassroomNumber: string
): boolean {
  const lesson = schedule.find((lesson) => lesson.courseId === lessonId);
  if (!lesson) return false;

  const conflict = validateLesson({
    ...lesson,
    classroomNumber: newClassroomNumber,
  });
  if (conflict === null) {
    lesson.classroomNumber = newClassroomNumber;
    return true;
  }

  return false;
}

function cancelLesson(lessonId: number): void {
  const index = schedule.findIndex((lesson) => lesson.courseId === lessonId);
  if (index !== -1) {
    schedule.splice(index, 1);
  }
}
