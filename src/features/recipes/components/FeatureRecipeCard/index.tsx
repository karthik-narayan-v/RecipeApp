import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity, View, Image } from 'react-native';

import AppText from '../../../../components/AppText';
import { theme } from '../../../../theme';
import Chip from '../Chip';

import styles from './styles';

type FeaturedRecipeCardProps = {
  image: string;
  category: string;
  duration: number;
  title: string;
  onPress?: () => void;
};

const FeaturedRecipeCard = ({
  image,
  category,
  duration,
  title,
  onPress,
}: FeaturedRecipeCardProps) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
    <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
    <LinearGradient
      colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.85)']}
      locations={[0, 0.4, 1]}
      style={styles.gradient}
    />
    <View style={styles.cardContent}>
      <View style={styles.badgeRow}>
        <Chip
          label={category}
          backgroundColor={theme.colors.lightGreen}
          textColor={theme.colors.darkGreen}
        />
        <Chip
          label={`${duration} MIN`}
          backgroundColor={'#ffffff33'}
          textColor={theme.colors.white}
        />
      </View>
      <AppText
        variant="headline"
        weight="bold"
        size="lg"
        color={theme.colors.white}
      >
        {title}
      </AppText>
    </View>
  </TouchableOpacity>
);

export default FeaturedRecipeCard;
