import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";

export default function Dashboard(){
  const { signOut } = useContext(AuthContext);
  
  return(
    <View>
      <Text>Dashboard stuff</Text>
      <TouchableOpacity style={{ width: '100%', backgroundColor: 'blue', height: 40, alignItems: 'center', justifyContent: 'center'}} onPress={signOut}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Sair</Text>
      </TouchableOpacity>
    </View>
  )
}