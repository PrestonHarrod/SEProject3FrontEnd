
import Vue from 'vue'
import Router from 'vue-router'
import DegreeList from './views/DegreeList.vue'
import StudentList from './views/StudentList.vue'
import AdvisorList from './views/AdvisorList.vue'
import CourseList from './views/CourseList.vue'
import CourseView from './views/courseView.vue'
import CourseAdd from './views/AddCourse.vue'
import CourseEdit from './views/EditCourse.vue'
import Home from './views/Home.vue'
Vue.use(Router)
export default new Router({
  mode: 'history',
  base:
  process.env.NODE_ENV === "development" ? "/" : "/courses/",
  routes : [
    
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/api/students',
      name: 'students',
      component: StudentList
    },
    {
      path: '/api/advisors',
      name: 'advisors',
      component: AdvisorList
    },
    {
      path: '/api/degree',
      name: 'degrees',
      component: DegreeList
    },
    {
      path: '/api/courses',
      name: 'courses',
      component: CourseList
    },
    {
      path: '/api/courses/:id',
      name: 'view',
      component: CourseView,
      props: true
    },
    {
        path: '/api/courses/courseadd',
        name: 'add',
        component: CourseAdd,
        props: true
      },
      {
        path: "/courses/course-edit/:id",
        name: "edit",
        component: CourseEdit,
        props: true
      }
  ]
})

