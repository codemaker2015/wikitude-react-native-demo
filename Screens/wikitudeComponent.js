import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {WikitudeView} from 'react-native-wikitude-sdk';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Share from "react-native-share";
const styles = StyleSheet.create({
  AR: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
const Wikitude = ({route, navigation}) => {
  const wikitudeView = useRef(null);
  const [isFocus, setFocus] = useState(false);

  console.log('URL WIKITUDE: ', route.params.url);

  useEffect(() => {
    const subscribeFocus = navigation.addListener('blur', () => {
      console.log('Is blur');
      if (wikitudeView.current) {
        //wikitudeView.current.stopRendering();
      }
      setFocus(false);
    });
    navigation.addListener('focus', () => {
      console.log('Is focus');
      setFocus(true);
      if (wikitudeView.current) {
        //wikitudeView.current.resumeRendering();
      }
    });
    navigation.setOptions({
      headerRight: () => (
        <Icon name="camera" size={40} onPress={() => takeScreenshot()} />
      ),
    });
    return subscribeFocus;
  }, [navigation]);
  const config = {
    licenseKey:
      'Ap5ULp7KI7/gQ936QIPW19tpi3I6LSpOAoBjbRNPhs/gnhvCKiTmeexS1OZlZIishncdfG1E0Z/uqQ8+QiNflI6hIf3KCx9JD7wg9b5C0oioDJsWwwlhJRP08k5NwAN3y1H+M5sUrxStVf8UbfWIJ2LJH2wzzQOstt61oZodj9JTYWx0ZWRfXzYSsDLNAw2PqFPYn6AoZnBk8i544sDcWuGnyOMW93Jh9V637+pQmsPeZ9VG4rTmsOl2NFm9nPhYT17ImCDheisbwiuxTKkERqHCN6lsMB1j1MetaL3d5skA2o3BLWf8bgiuaoyiDNAWXJAAn4w/cqaWsdb3UMV+Tci5UOVBdQXAOAhlPh2Lzp5z57HBs5ngS3Q+8Hmds6uLTAepqskbT7VQVrmseV1S2LJ8wp86dgBXL7514nk5b+mMmjcdHxYpEIPmY/t/E4ugihIvjuBSUASs2Fx6Qy5UTo+JDcYHAt/WHR5SyY5zPRfHkfGVu9OvA3ryJhktZw1gh3MqkEAYvzn2M7nBDQkRoBpwcewPOdOXykmXoDIy7NrIQdc0uh7XvEv22RMUD9KqR/g2be9kq+rSbD20x7SFJZ9K5UOsLfFcp7gM3KucroRvvg8T4a9jufuK8F26/neGCl9V8r7Y5JyRxQgaJkO9e1Mb2nDlwIoWYr5TxDeo6RJlpXlvNNe85EJY6sdWExk1G6j2O3hxxrPED3Trtj5HrCyluFwoFxqvFCtGrpFuom15Mot5xXzdyc2BURufO72bcQbw4K2QclHoPD78RcYFhMgYTI9BqA5AE+Z38h16MaATkFWv2OsOsuicF74tIPmv+YaOOlLkuLMUNLg+IYFvAp+DeYopU4I9CvPb07BzaxY=',
    url: route.params.url,
  };
  const takeScreenshot = () => {
    if (wikitudeView.current) {
      wikitudeView.current.captureScreen(true);
    }
  };
  const onFinishLoading = event => {
    // event.success = true
    //This event is called when the html is finish loaded
    //For fail event, use onFailLoading
    console.log('On Finish Loading');
  };
  const onJsonReceived = object => {
    console.log(object);
  };

  const onFailLoading = event => {
    console.log(event);
  };

  const onScreenCaptured = event => {
    if(!event.image) return;
    
    Share.open({
      message: 'Share this awesome AR with Wikitude',
      title: 'Vishnu Sivan',
      url: event.image,
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };
  if (!isFocus) {
    return <SafeAreaView />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <WikitudeView
          ref={wikitudeView}
          licenseKey={config.licenseKey}
          url={config.url}
          style={styles.AR}
          onFailLoading={onFailLoading}
          onJsonReceived={onJsonReceived}
          onFinishLoading={onFinishLoading}
          onScreenCaptured={onScreenCaptured}
        />
      </SafeAreaView>
    );
  }
};
export default Wikitude;
