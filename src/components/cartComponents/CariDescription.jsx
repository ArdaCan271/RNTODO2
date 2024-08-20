import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useMemo, useState } from 'react';

import { useTheme } from '../../constants/colors';

const CariDescription = ({ description, setDescription }) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const [textHeight, setTextHeight] = useState(50);

  const handleDescriptionChange = (text) => {
    setDescription(text);
    setTextHeight(50 + (text.split('\n').length - 1) * 20);
  };

  return (
    <View style={styles.descriptionSection}>
      <View style={[styles.descriptionInputContainer, { height: Math.min(150, textHeight) }]}>
        <Text style={[styles.descriptionInputLabel, { alignSelf: textHeight > 50 ? 'flex-start' : 'center', marginTop: textHeight > 50 ? 13 : 0 }]}>Açıklama:</Text>
        <TextInput
          style={[styles.descriptionInput, { height: Math.min(150, textHeight) }]}
          placeholder='Açıklama Giriniz...'
          placeholderTextColor={theme.textAlt}
          multiline={true}
          numberOfLines={4}
          value={description}
          onChangeText={handleDescriptionChange}
        />
      </View>
    </View>
  );
}

const getStyles = (theme) => StyleSheet.create({
  descriptionSection: {
    paddingHorizontal: 20,
    width: '100%',
    marginTop: 14,
  },
  descriptionInputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.primary,
    borderRadius: 5,
  },
  descriptionInputLabel: {
    color: theme.primary,
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  descriptionInput: {
    flex: 1,
    color: theme.text,
    fontSize: 16,
    paddingHorizontal: 10,
  },
});

export default CariDescription;