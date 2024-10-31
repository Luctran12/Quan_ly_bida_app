import axios from "axios";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, View } from "react-native";

const CreateQR = ({ route }) => {
  const { accountNo, accountName, acqId } = route.params; // Access params
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const requestBody = {
      accountNo: accountNo,
      accountName: accountName,
      acqId: acqId,
      amount: 0, // Assuming an amount; you can adjust it as needed
      addInfo: "Ung Ho Quy Vac Xin",
      format: "text",
      template: "compact",
    };

    axios
      .post("https://api.vietqr.io/v2/generate", requestBody)
      .then((response) => {
        setImageUrl(response.data.data.qrDataURL);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching image URL:", error);
        setLoading(false);
      });
  }, []);

  //0397042630

  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Image source={{ uri: imageUrl }} style={{ width: 400, height: 400 }} />
      )}
    </View>
  );
};

export default CreateQR;
