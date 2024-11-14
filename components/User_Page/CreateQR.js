import axios from "axios";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, Image, View } from "react-native";
import { getAuth } from "firebase/auth";
import { FIRESTORE_DB } from "../Login_Function/firebaseConfig";

const CreateQR = ({ route, navigation }) => {
  const { accountNo, accountName, acqId, amount } = route.params; // Access params
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrUpdateQR = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const userId = user.uid;
        const bankDocRef = doc(FIRESTORE_DB, "bankAccounts", userId);

        const requestBody = {
          accountNo: accountNo,
          accountName: accountName,
          acqId: acqId,
          amount: amount || 0,
          addInfo: "Thanh toan Billiard club",
          format: "text",
          template: "compact",
        };

        try {
          // Check if the document already exists
          const docSnapshot = await getDoc(bankDocRef);

          if (docSnapshot.exists()) {
            // Update the existing document
            await setDoc(bankDocRef, requestBody, { merge: true });
            console.log("Document updated with new data");
          } else {
            // Create a new document if it doesn't exist
            await setDoc(bankDocRef, requestBody);
            console.log("New document created with data");
          }

          // Generate QR code
          const response = await axios.post(
            "https://api.vietqr.io/v2/generate",
            requestBody
          );
          setImageUrl(response.data.data.qrDataURL);
        } catch (error) {
          console.error("Error handling QR or fetching image URL:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("No user is signed in");
        setLoading(false);
      }
    };

    fetchOrUpdateQR();
  }, [accountNo, accountName, acqId, amount]); // Rerun if any of these parameters change

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
