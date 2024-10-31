import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CourseList from "./component/Course/CourseList";
import ClassList from "./component/Class/ClassList";
import { RootStackParamList } from "./type/type";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="CourseList">
      <Stack.Screen name="CourseList" component={CourseList} />
      <Stack.Screen name="ClassList" component={ClassList} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
