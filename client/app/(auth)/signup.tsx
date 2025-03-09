import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";


type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup = () => {
  const [signupForm, setSignupForm] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  return (
    <SafeAreaView className="bg-gray-300 h-full">
      <View>
        <View>
          <Text>
            Welcome Aboard
          </Text>
          <Text>
            Create an account now
          </Text>
        </View>

        <View className="gap-y-5">
          <View>
            <TextInput
              placeholder="Enter your name"
              placeholderTextColor={"gray"}
              style={ styles.input }
              value={ signupForm.name }
            />
          </View>

          <View>
            <TextInput
              placeholder="Enter your email"
              placeholderTextColor={"gray"}
              style={ styles.input }
              value={ signupForm.email }
            />
          </View>

          <View>
            <TextInput
              placeholder="Enter password"
              placeholderTextColor={"gray"}
              style={ styles.input }
              value={ signupForm.password }
              secureTextEntry
              textContentType="password"
              passwordRules="required: upper; required: lower; required: digit; minlength: 8;"
            />
          </View>

          <View>
            <TextInput
              placeholder="Confirm password"
              placeholderTextColor={"gray"}
              style={ styles.input }
              value={ signupForm.confirmPassword }
              secureTextEntry
              textContentType="password"
              passwordRules="required: upper; required: lower; required: digit; minlength: 8;"
            />
          </View>
        </View>

        <Text className="mx-10 mt-5">By continuing you accept our Privacy Policy and Terms of Use</Text>

        <TouchableOpacity className="bg-blue-500 p-4 m-10 rounded">
          <Text className="text-white text-center text-lg">Register</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  )
};


const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    marginHorizontal: 35,
    padding: 10,
    height: 55,
    fontSize: 18
  }
});



export default Signup;