// ClassList.tsx
import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import ClassItem from "./ClassItem";
import { firestore } from "../../config/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { RouteProp, useRoute } from "@react-navigation/native";
import SearchBar from "../Search/Search";

interface Class {
  id: string;
  teacher: string;
  classDate: string;
  className: string;
  description: string;
  courseId: number;
}

const ClassList = () => {
  const route = useRoute<RouteProp<{ params: { courseId: number } }>>();
  const { courseId } = route.params;
  const [classes, setClasses] = useState<Class[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const classList: Class[] = [];
        const classRef = collection(firestore, "classes");
        const classQuery = query(
          classRef,
          where("courseFirestoreId", "==", courseId)
        );

        const snapshot = await getDocs(classQuery);
        console.log("Số lượng tài liệu lớp học:", snapshot.size);

        snapshot.forEach((doc) => {
          const data = doc.data();
          classList.push({
            id: doc.id,
            teacher: data.teacherName,
            classDate: data.classDate,
            className: data.className,
            description: data.description,
            courseId: data.courseId,
          });
        });

        setClasses(classList);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu lớp học: ", error);
      }
    };

    fetchClasses();
  }, [courseId]);

  const filteredClasses = classes.filter((classItem) => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    return (
      classItem.className.toLowerCase().includes(lowerCaseTerm) ||
      classItem.teacher.toLowerCase().includes(lowerCaseTerm)
    );
  });

  return (
    <View style={styles.container}>
      <SearchBar searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />
      <FlatList
        data={filteredClasses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ClassItem classItem={item} onPress={() => {}} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default ClassList;
