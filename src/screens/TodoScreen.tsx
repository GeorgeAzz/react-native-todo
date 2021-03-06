import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { FontAwesome, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { Methods } from "../types";

import { theme } from "../theme";
import AppCard from "../components/ui/Card";
import EditModal from "../components/EditModal";
import AppFontBold from "../components/ui/AppFontBold";
import AppButton from "../components/ui/AppButton";

interface Props extends Methods {
    task: {
        id: string;
        title: string;
    };
}

const TodoScreen = ({ goBack, task, deleteTask, updateTask }: Props) => {
    const [modal, setModal] = React.useState<boolean>(false);

    const updateHandler = (title: string) => {
        updateTask(task.id, title);
        setModal(false);
    };

    console.log(task);

    return (
        <View>
            <EditModal
                value={task.title && task.title}
                visible={modal}
                onCancel={() => setModal(false)}
                updateTask={updateHandler}
            />
            <AppCard style={style.card}>
                <AppFontBold style={style.title}>{task.title}</AppFontBold>
                <AppButton onPress={() => setModal(true)}>
                    <FontAwesome name="edit" size={20} />
                </AppButton>
            </AppCard>
            <View style={style.buttons}>
                <View style={style.button}>
                    <AppButton color={theme.grey} onPress={goBack}>
                        <AntDesign name="back" size={20} color="#fff" />
                    </AppButton>
                </View>
                <View style={style.button}>
                    <AppButton color={theme.red} onPress={() => deleteTask(task.id)}>
                        <MaterialCommunityIcons name="delete-outline" size={20} />
                    </AppButton>
                </View>
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        width: Dimensions.get("window").width / 3,
    },
    title: {
        fontSize: 20,
    },
    card: {
        marginBottom: 20,
    },
});

export default TodoScreen;
