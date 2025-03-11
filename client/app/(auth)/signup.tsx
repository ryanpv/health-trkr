import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { useState } from "react";
import  { useForm, Controller, SubmitHandler } from "react-hook-form";


type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup = () => {
  const { register, setValue, control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })
  ;

  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    console.log("data: ", data);
  }

  return (
    <SafeAreaView className="bg-gray-300 h-full">
        <View>
          <Text>
            Welcome Aboard
          </Text>
          <Text>
            Create an account now
          </Text>
        </View>

      <View>
        <View className="gap-y-5">
          <View>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Enter your name"
                  placeholderTextColor={ "gray" }
                  style={ styles.input }
                  onBlur={ onBlur }
                  onChangeText={ onChange }
                  value={ value }
                />
              )}
            />
          </View>

          <View>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value }}) => (
                <TextInput
                  placeholder="Enter your email"
                  placeholderTextColor={"gray"}
                  style={ styles.input }
                  onBlur={ onBlur }
                  onChangeText={ onChange }
                  value={ value }
                />
              )}
            />
          </View>

          <View>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value }}) => (
                <TextInput
                  placeholder="Enter password"
                  placeholderTextColor={"gray"}
                  style={ styles.input }
                  onBlur={ onBlur }
                  onChangeText={ onChange }
                  value={ value }
                  secureTextEntry
                  textContentType="password"
                  passwordRules="required: upper; required: lower; required: digit; minlength: 8;"
                />
              )}
            />
          </View>

          <View>
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value }}) => (
                <TextInput
                  placeholder="Confirm password"
                  placeholderTextColor={"gray"}
                  style={ styles.input }
                  onBlur={ onBlur }
                  onChangeText={ onChange }
                  value={ value }
                  secureTextEntry
                  textContentType="password"
                  passwordRules="required: upper; required: lower; required: digit; minlength: 8;"
                />
              )}
            />
          </View>
        </View>

        <Text className="mx-10 mt-5">By continuing you accept our Privacy Policy and Terms of Use</Text>

        <TouchableOpacity className="bg-blue-500 p-4 m-10 rounded" onPress={handleSubmit(onSubmit)}>
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